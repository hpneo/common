import { render } from "preact";
import "preact/debug";
// eslint-disable-next-line import/no-unresolved
import * as stories from "../stories/**/*.stories.js";
import { useResizable } from "react-resizable-layout";
import StoriesNavigationTree from "./components/StoriesNavigationTree.js";
import buildStructuresBasedOnStories from "./helpers/buildStructuresBasedOnStories.js";
import StoryControlsTable from "./components/StoryControlsTable.js";
import StoryRenderer from "./components/StoryRenderer.js";
import StoryArtboard from "./components/StoryArtboard.js";
import Tabs from "./components/Tabs.js";
import StoryCodeBlock from "./components/StoryCodeBlock.js";

const { structuredStories, groupedStories } =
  buildStructuresBasedOnStories(stories);

console.log({ structuredStories, groupedStories });

function Storybook() {
  const currentPath = window.location.pathname.replace(/^\/stories\//, "");
  const storyToRender = structuredStories[currentPath];
  const { position, separatorProps } = useResizable({
    axis: "y",
    reverse: true,
    min: 360,
    max: 480,
  });

  if (
    !storyToRender &&
    Object.keys(structuredStories).length > 0 &&
    window.location.pathname === "/"
  ) {
    const firstStory = Object.keys(structuredStories)[0];
    window.location.href = `/stories/${firstStory}`;
  }

  return (
    <main class="w-screen h-screen grid grid-cols-[240px_auto]">
      <nav class="bg-slate-100 p-2 border-r border-r-slate-300 text-sm">
        <StoriesNavigationTree tree={groupedStories} />
      </nav>
      <StoryRenderer story={storyToRender}>
        <section class="w-full h-full flex flex-col">
          <div class="w-full h-full p-4 bg-white flex-1">
            <StoryArtboard />
          </div>
          <div
            class="h-1 hover:cursor-row-resize bg-slate-200 active:bg-slate-300"
            {...separatorProps}
          />
          <Tabs
            class="w-full border-t border-t-slate-300 p-4 overflow-hidden"
            style={{ height: position }}
            items={[
              {
                key: "controls",
                label: "Controls",
                children: <StoryControlsTable />,
              },
              {
                key: "code",
                label: "Code",
                children: <StoryCodeBlock />,
              },
            ]}
          />
        </section>
      </StoryRenderer>
    </main>
  );
}

render(<Storybook />, document.body);
