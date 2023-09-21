import { h } from "preact";
import { useContext } from "preact/hooks";
import { StoryRendererContext } from "./StoryRenderer";

function StoryArtboard() {
  const { story, args } = useContext(StoryRendererContext);

  return h(story?.story?.render, args);
}

export default StoryArtboard;
