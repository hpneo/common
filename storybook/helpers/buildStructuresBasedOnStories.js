import kebabCase from "lodash/kebabCase";
import set from "lodash/set";

function addEntry({ storyKey, storyFile, structuredStories, groupedStories }) {
  const title = storyFile.default.title;
  set(groupedStories, title.split("/"), {});

  Object.entries(storyFile)
    .filter(([, story]) => story.render)
    .forEach(([childKey, story]) => {
      const path = [...storyKey.split("/"), childKey]
        .map((key) => kebabCase(key))
        .join("/");

      set(groupedStories, [...title.split("/"), childKey], path);

      structuredStories[path] = {
        story,
        meta: storyFile.default,
      };
    });
}

function buildStructuresBasedOnStories(stories) {
  const structuredStories = {};
  const groupedStories = {};

  parseStories({ stories, structuredStories, groupedStories });

  return { structuredStories, groupedStories };
}

function parseStories({
  stories,
  parentStoryKey = "",
  structuredStories,
  groupedStories,
}) {
  Object.entries(stories).forEach(([storyKey, storyFile]) => {
    if (storyFile.__esModule) {
      addEntry({
        storyKey: [parentStoryKey, storyKey].filter(Boolean).join("/"),
        storyFile,
        structuredStories,
        groupedStories,
      });
    } else {
      parseStories({
        stories: storyFile,
        structuredStories,
        groupedStories,
        parentStoryKey: storyKey,
      });
    }
  });

  return { structuredStories, groupedStories };
}

export default buildStructuresBasedOnStories;
