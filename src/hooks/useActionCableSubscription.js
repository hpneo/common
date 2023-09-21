import { useEffect, useState } from "preact/hooks";
import { createConsumer } from "@rails/actioncable";
import queryString from "query-string";

const PROTOCOL_PREFIX = process.env.NODE_ENV === "production" ? "wss" : "ws";

function getConsumerUrl() {
  return `${PROTOCOL_PREFIX}://${process.env.API_HOST || location.host}/cable`;
}

function useActionCableSubscription(
  subscriptionName,
  options = {}
) {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const consumer = createConsumer(getConsumerUrl());

    setSubscription(consumer.subscriptions.create(subscriptionName, options));

    return () => {
      if (subscription) {
        consumer.subscriptions.remove(subscription);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString.stringify(subscriptionName)]);

  return subscription;
}

export default useActionCableSubscription;
