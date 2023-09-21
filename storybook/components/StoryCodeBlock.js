import { useContext } from "preact/hooks";
import Markup from "preact-markup";
import { StoryRendererContext } from "./StoryRenderer";

function StoryCodeBlock() {
  const { story } = useContext(StoryRendererContext);

  if (!story.story.parameters.docs) {
    return null;
  }

  return (
    <pre class="text-sm bg-slate-800 text-white rounded-md p-4">
      <Markup
        markup={window.Prism.highlight(
          story.story.parameters.docs.source.originalSource,
          window.Prism.languages.javascript,
          "javascript"
        )}
        trim={false}
        wrap={false}
      />
    </pre>
  );
}

export default StoryCodeBlock;
