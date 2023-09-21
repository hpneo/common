import { Menu } from "@headlessui/react";
import clsx from "clsx";

function Dropdown({
  button,
  items = [],
  position,
  size = "md",
  title,
  rootClassName,
  buttonClassName,
  menuClassName,
}) {
  const classNamesForSize = {
    md: {
      root: "is-md",
      item: "is-md",
    },
    sm: {
      root: "is-sm",
      item: "is-sm",
    },
    xs: {
      root: "is-xs",
      item: "is-xs",
    },
  };
  const classNameForPosition = position === "left" ? "left-0" : "right-0";

  return (
    <Menu
      as="div"
      className={clsx(
        "relative inline-block text-left dropdown",
        classNamesForSize[size].root,
        rootClassName
      )}
    >
      {button ? (
        <Menu.Button className={buttonClassName} title={title}>
          {button}
        </Menu.Button>
      ) : null}
      <Menu.Items
        className={clsx(
          "w-56 origin-top-right bg-white divide-y divide-gray-100 dropdown-menu ring-1 ring-black ring-opacity-5 focus:outline-none",
          classNameForPosition,
          menuClassName
        )}
      >
        <div className="px-1 py-1">
          {items.map((item) => (
            <Menu.Item key={item.key || item.id} disabled={item.disabled}>
              <button
                className={clsx(
                  "justify-start w-full text-gray-700 shadow-none button hover:bg-gray-100",
                  classNamesForSize[size].item
                )}
                type="button"
                disabled={item.disabled}
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </button>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}

Dropdown.Button = Menu.Button;

export default Dropdown;
