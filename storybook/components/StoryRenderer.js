import { createContext } from "preact";
import { useState } from "preact/hooks";

const StoryRendererContext = createContext(null);

function StoryRenderer({ story, children }) {
  const [args, setArgs] = useState(story.story.args ?? {});

  return (
    <StoryRendererContext.Provider value={{ story, args, setArgs }}>
      {children}
    </StoryRendererContext.Provider>
  );
}

export { StoryRendererContext };

export default StoryRenderer;
