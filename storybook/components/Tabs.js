import clsx from "clsx";
import { useState } from "preact/hooks";

function Tabs({ items, ...props }) {
  const [selectedTabKey, setSelectedTabKey] = useState(items[0].key);
  const selectedTab = items.find((item) => item.key === selectedTabKey);

  return (
    <section class={props.class} style={props.style}>
      <nav class="mb-2">
        {items.map((item) => (
          <button
            type="button"
            class={clsx(
              "py-1 px-2 rounded-md",
              item.key === selectedTabKey ? "font-semibold bg-slate-300" : null
            )}
            key={item.key}
            onClick={() => setSelectedTabKey(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div class="overflow-auto h-full">{selectedTab.children}</div>
    </section>
  );
}

export default Tabs;
