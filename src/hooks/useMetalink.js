import { useState, useEffect } from "preact/hooks";

function useMetalink(url, options = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let serviceURLAsString = null;

  if (url) {
    const serviceURL = new URL("https://metalink.dev/");

    serviceURL.searchParams.append("url", url);

    Object.entries(options).forEach(([name, value]) =>
      serviceURL.searchParams.append(name, value)
    );

    serviceURLAsString = serviceURL.toString();
  }

  async function request() {
    if (serviceURLAsString) {
      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch(serviceURLAsString);
        const data = await response.json();

        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceURLAsString]);

  return { data, error, isLoading, refetch: request };
}

export default useMetalink;
