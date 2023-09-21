import { Fragment } from "preact";
import { Popover as BasePopover, Transition } from "@headlessui/react";
import clsx from "clsx";

function Popover({
  button,
  renderButton = "button",
  panelClassName,
  children,
}) {
  return (
    <BasePopover className="relative">
      {({ open }) => (
        <>
          <BasePopover.Button as={renderButton}>{button}</BasePopover.Button>
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <BasePopover.Panel
              static
              className={clsx(
                "absolute z-10 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl",
                panelClassName
              )}
            >
              <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                {children}
              </div>
            </BasePopover.Panel>
          </Transition>
        </>
      )}
    </BasePopover>
  );
}

export default Popover;
