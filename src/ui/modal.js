import { Fragment } from "preact";
import { useState } from "preact/hooks";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

export function useModal(initialValue) {
  const [isOpen, setIsOpen] = useState(initialValue);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return { isOpen, open: openModal, close: closeModal };
}

function Modal({
  isOpen,
  closeModal,
  title,
  children,
  overlayClassName,
  wrapperClassName,
  titleClassName,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={clsx(
                "fixed inset-0 bg-gray-700 bg-opacity-60",
                overlayClassName
              )}
            />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={clsx(
                "inline-block w-full overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-xl",
                wrapperClassName
              )}
            >
              {title ? (
                <Dialog.Title as="h3" className={titleClassName}>
                  {title}
                </Dialog.Title>
              ) : null}
              <div className={title ? "mt-2" : ""}>{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
