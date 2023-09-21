import clsx from "clsx";
import Modal from "./modal";

function ConfirmationModal({
  title,
  supportingText,
  confirmText,
  confirmButtonClassName = "bg-error-600 text-white",
  isOpen,
  closeModal,
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title={title}
      overlayClassName="backdrop-blur-md"
      wrapperClassName="max-w-sm bg-white p-6"
      titleClassName="text-lg font-medium text-gray-900 text-center"
    >
      {supportingText ? (
        <p class="mt-2 text-sm text-gray-500 text-center">{supportingText}</p>
      ) : null}
      <footer class="flex items-center justify-between gap-3 mt-8">
        <button
          type="button"
          onClick={closeModal}
          class="button is-lg flex-1 border border-gray-300 bg-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          class={clsx("button is-lg flex-1", confirmButtonClassName)}
        >
          {confirmText}
        </button>
      </footer>
    </Modal>
  );
}

export default ConfirmationModal;
