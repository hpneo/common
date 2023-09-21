function useDOMState(id, initialValue = null) {
  const scriptTag = document.getElementById(id);

  if (scriptTag) {
    function updateDOMElement(value) {
      scriptTag.textContent = JSON.stringify(value);
    }

    try {
      return [JSON.parse(scriptTag.textContent), updateDOMElement];
    } catch (error) {
      console.error(error);
      return [initialValue, updateDOMElement];
    }
  }

  return [initialValue];
}

export default useDOMState;
