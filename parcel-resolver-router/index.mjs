import { Resolver } from "@parcel/plugin";
import glob from "fast-glob";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

// - /app/page.js, /app/dashboard/page.js
// - /pages/index.js, /pages/dashboard/index.js
// - /routes/index.js, /routes/dashboard/index.js
const GLOB_PATTERNS = {
  next_app: "./app/**/page.js",
  next_pages: "./pages/**/*.js",
  remix: "./routes/**/*.js",
};

const mode = "next_app";

const DYNAMIC_ROUTE_SEGMENT_PATTERN = /\[([a-zA-Z]*)\]/;
const CATCH_ALL_SEGMENT_PATTERN = /\[(\.\.\.([a-zA-Z]*))\]/;
const ROUTE_GROUP_PATTERN = /\(([a-zA-Z_-]*)\)/;

function buildRouteFromFilePath(filePath) {
  const pageRoute = filePath
    .replace(/^\.\/app/, "")
    .replace(/^\.\/pages/, "")
    .replace(/^\.\/routes/, "")
    .replace(/\/page\.js$/, "")
    .split("/")
    .map((segment) =>
      segment
        .replace(CATCH_ALL_SEGMENT_PATTERN, ":$2*")
        .replace(DYNAMIC_ROUTE_SEGMENT_PATTERN, ":$1")
        .replace(ROUTE_GROUP_PATTERN, "")
    )
    .filter(Boolean)
    .join("/");

  return pageRoute.startsWith("/") ? pageRoute : `/${pageRoute}`;
}

export default new Resolver({
  async resolve({ specifier, options }) {
    if (specifier === "@common/router/pages") {
      const glob_pattern = GLOB_PATTERNS[mode];
      const glob_layout_pattern = "./app/**/layout.js";

      const files = await glob(glob_pattern, fs, {
        ignore: ["node_modules"],
        cwd: options.projectRoot,
      });
      let layouts = await glob(glob_layout_pattern, fs, {
        ignore: ["node_modules"],
        cwd: options.projectRoot,
      });

      if (mode !== "next_app") {
        console.warn("Layouts not supported in 'remix' or 'next_pages' modes");
        layouts = [];
      }

      const code = `import { h, Fragment } from "preact";
import Router, { useRouter } from "preact-router";
import sortBy from "lodash/sortBy";
import partition from "lodash/partition";

const pages = [
  ${files
    .map((pagePath) => {
      const pageRoute = buildRouteFromFilePath(pagePath);
      const layoutPath = pagePath.replace(/page\.js$/, "layout.js");
      const hasLayout = fsSync.existsSync(layoutPath);
      const layout = hasLayout ? `require("${layoutPath}")` : "null";
      const isPartOfRouteGroup = !!pagePath.match(ROUTE_GROUP_PATTERN);

      return `{
        route: "${pageRoute}",
        component: require("${pagePath}"),
        layout: ${layout},
        isPartOfRouteGroup: ${isPartOfRouteGroup}
      }`;
    })
    .join(",\n")}
];

function createRoutesFromPages(pages) {
  const routes = [];

  let sortedPagesByRouteLength = sortBy(pages, (page) => page.route.length);

  while (sortedPagesByRouteLength.length > 0) {
    const page = sortedPagesByRouteLength.shift();

    const [childrenPages, otherPages] = partition(
      sortedPagesByRouteLength,
      (childPage) => {
        if (childPage.isPartOfRouteGroup) {
          return false;
        }

        return childPage.route.startsWith(page.route);
      }
    );

    sortedPagesByRouteLength = otherPages;

    routes.push({
      ...page,
      children: createRoutesFromPages(childrenPages),
    });
  }

  return routes;
}

function Route({ path, component, layout, childRoutes = [], ...routeProps }) {
  childRoutes = Array.isArray(childRoutes) ? childRoutes : [childRoutes];

  const element = h(component, { path });
  const LayoutOrFragment = layout ?? Fragment;

  if (childRoutes.length === 0) {
    return <LayoutOrFragment {...routeProps}>{element}</LayoutOrFragment>;
  }

  return (
    <LayoutOrFragment {...routeProps}>
      <Router>
        {element}
        {childRoutes.map((page) => (
          <Route
            key={page.route}
            path={page.children.length === 0 ? page.route : \`\${page.route}/:rest*\`}
            component={page.component.default}
            layout={page.layout?.default}
            childRoutes={page.children}
          />
        ))}
      </Router>
    </LayoutOrFragment>
  );
}

function ApplicationRouter() {
  const routes = createRoutesFromPages(pages);

  if (routes.length === 0) {
    return null;
  }

  return (
    <Router>
      {routes.map((page) => (
        <Route
          key={page.route}
          path={page.children.length === 0 ? page.route : \`\${page.route}/:rest*\`}
          component={page.component.default}
          layout={page.layout?.default}
          childRoutes={page.children}
        />
      ))}
    </Router>
  );
}

export default ApplicationRouter;
`;

      return {
        filePath: path.join(options.projectRoot, "router.js"),
        code,
        invalidateOnFileCreate: [
          { glob: glob_pattern },
          { glob: glob_layout_pattern },
        ],
        invalidateOnFileChange: [
          path.join(options.projectRoot, "router.js"),
          ...files.map((filePath) => path.join(options.projectRoot, filePath)),
          ...layouts.map((filePath) =>
            path.join(options.projectRoot, filePath)
          ),
        ],
      };
    } else if (
      ["page.js", "layout.js"].some((fileName) => specifier.endsWith(fileName))
    ) {
      const filePath = path.join(options.projectRoot, specifier);
      const code = await fs.readFile(filePath, "utf-8");

      return {
        filePath: path.join(options.projectRoot, specifier),
        code,
        invalidateOnFileCreate: [{ filePath }],
        invalidateOnFileChange: [filePath],
      };
    }

    return null;
  },
});
