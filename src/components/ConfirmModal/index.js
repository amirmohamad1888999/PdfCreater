import React from "react";

const ConfirmModal = ({
  isOpen,
  title,
  body,
  closeButtonText = "Close",
  submitButtonText = "Submit",
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999999]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h3 className="text-md font-bold mb-4">{title}</h3>
        <p className="mb-6 text-sm">{body}</p>
        <div className="flex text-sm w-full justify-around gap-4">
          <button
            onClick={onSubmit}
            className="px-4 py-2 w-full bg-[#00674f] text-white rounded transition"
          >
            {submitButtonText}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 w-full bg-[#fff] border-[1px] border-[#00674f] text-[#00674f] rounded transition"
          >
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
