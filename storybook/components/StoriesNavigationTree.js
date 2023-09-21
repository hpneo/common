import clsx from "clsx";

function StoriesNavigationTreeNode({ name, node, depth }) {
  const currentPath = window.location.pathname;

  if (typeof node === "string") {
    const path = `/stories/${node}`;

    return (
      <li
        className={clsx("py-0.5 px-1", path === currentPath ? "active" : null)}
      >
        <a href={path}>{name}</a>
      </li>
    );
  }

  const isCurrentPathInNodeChildren = Object.values(node).some((child) => {
    const path = `/stories/${child}`;
    return path === currentPath;
  });

  return (
    <li>
      <details
        open={depth === 0 || isCurrentPathInNodeChildren}
        class="marker:text-xs marker:text-gray-400"
      >
        <summary class={depth === 0 ? "font-semibold text-gray-600" : null}>
          {name}
        </summary>
        <StoriesNavigationTree tree={node} depth={depth + 1} />
      </details>
    </li>
  );
}

function StoriesNavigationTree({ tree = {}, depth = 0 }) {
  return (
    <ul style={{ paddingLeft: 8 * depth }}>
      {Object.entries(tree).map(([name, children]) => (
        <StoriesNavigationTreeNode
          key={name}
          name={name}
          node={children}
          depth={depth}
        />
      ))}
    </ul>
  );
}

export default StoriesNavigationTree;
