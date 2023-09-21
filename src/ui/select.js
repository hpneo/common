import { forwardRef } from "preact/compat";
import { useState, useEffect } from "preact/hooks";
import { Listbox } from "@headlessui/react";
import ChevronDown from "lucide-preact/dist/esm/icons/chevron-down";
import clsx from "clsx";

const defaultProps = {
  classNames: {
    root: "w-max",
    button:
      "bg-white border border-gray-300 shadow-xs rounded-lg py-2.5 px-3.5",
    list: "rounded-lg shadow-lg border border-gray-100 bg-white mt-1 min-w-max",
    item: "rounded px-3 py-2",
    open: {
      button: "",
    },
    closed: {
      button: "",
    },
  },
};

function defaultRenderItem({ item, disabled }) {
  return (
    <span
      className={clsx(disabled ? "text-opacity-50" : null, "block truncate")}
    >
      {item.label || item.name}
    </span>
  );
}

function defaultRenderButton(selectedItem, placeholder) {
  let content = placeholder;

  if (selectedItem) {
    content =
      typeof selectedItem === "object" ? selectedItem.name : selectedItem;
  }

  return (
    <>
      <span className="flex-1 truncate">{content}</span>
      <ChevronDown className="w-5 h-5 pointer-events-none" aria-hidden="true" />
    </>
  );
}

const Select = forwardRef(
  ({
    label,
    value,
    placeholder = "",
    items,
    renderItem,
    renderButton,
    onChange,
    classNames,
  }) => {
    const [selectedItem, setSelectedItem] = useState(value || items[0]);

    const renderItemFunction = renderItem ? renderItem : defaultRenderItem;
    const renderButtonFunction = renderButton
      ? renderButton
      : defaultRenderButton;

    function handleChange(item) {
      setSelectedItem(item);
      onChange(item);
    }

    useEffect(() => {
      if (value && onChange) {
        const newSelectedItem = items.find((item) => {
          if (item.key) {
            return item.key === value.key;
          }

          return item.id === value.id;
        });
        setSelectedItem(newSelectedItem ?? null);
      }
    }, [items, value, onChange]);

    return (
      <div>
        {label ? <label className="input-label">{label}</label> : null}
        <Listbox value={selectedItem} onChange={handleChange}>
          {({ open }) => (
            <div className={clsx("relative", classNames.root)}>
              <Listbox.Button
                className={clsx(
                  "cursor-pointer flex items-center justify-between gap-4",
                  classNames.button || Select.defaultProps?.classNames?.button,
                  open ? classNames.open?.button : classNames.closed?.button
                )}
              >
                {renderButtonFunction(selectedItem, placeholder)}
              </Listbox.Button>
              <Listbox.Options
                className={clsx(
                  "absolute z-10 w-full overflow-auto",
                  classNames.list || Select.defaultProps?.classNames?.list
                )}
              >
                {items.map((item) => (
                  <Listbox.Option
                    key={item.key || item.id}
                    value={item}
                    className={clsx(
                      "hover:bg-gray-50",
                      item.disabled ? "cursor-not-allowed" : "cursor-pointer",
                      classNames.item || Select.defaultProps?.classNames?.item
                    )}
                    disabled={item.disabled ?? false}
                  >
                    {({ selected, disabled }) =>
                      renderItemFunction({ item, selected, disabled })
                    }
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      </div>
    );
  }
);

Select.defaultProps = defaultProps;

export default Select;
