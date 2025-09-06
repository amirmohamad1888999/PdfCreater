import Modal1 from "react-modal";
import Image from "next/image";
import { useState, useEffect } from "react";
const BottomModal = ({
  isOpen,
  addButton,
  closeModal,
  title,
  children,
  closeTitle,
  icon,
  classNameWrapper,
  label,
  confirmTitle, // پراپ جدید برای متن دکمه تأیید
  onConfirm,
}) => {
  return (
    <Modal1
      isOpen={isOpen}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      portalClassName="modal-wrapper"
      closeTimeoutMS={400}
      overlayClassName={classNameWrapper ? classNameWrapper : "overlayselect"}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
    >
      <div className="modal-container">
        <div
          className={`flex justify-between ${
            label && label.length > 0 ? "items-start" : "items-center"
          }  modal-containerdiv`}
        >
          <div className="flex flex-col">
            {icon}
            <h2 className="mt-3 mr-2 font-bold">{title}</h2>
            {label && label.length > 0 && (
              <div className="relative rtl text-right mt-0 text-[13px]">
                لطفا یکی از انواع شارژ را انتخاب نمایید.
              </div>
            )}
          </div>

          <div className="colse-btn" onClick={closeModal}>
            <img
              src="/svg/closeButton.svg"
              alt="closeButton"
              width={24}
              height={24}
            />
          </div>
        </div>

        {children}

        {confirmTitle ? (
          <div className="flex items-center mt-5 justify-between ">
            {confirmTitle && (
              <button
                onClick={onConfirm}
                className="w-[70%] h-10 text-white rounded-lg flex justify-center items-center bg-custom-green"
              >
                {confirmTitle}
              </button>
            )}
            {closeTitle && (
              <button
                onClick={closeModal}
                className="w-[28%] h-10 bg-white rounded-lg flex justify-center items-center border border-custom-green text-custom-green"
              >
                {closeTitle}
              </button>
            )}
          </div>
        ) : (
          closeTitle &&
          !addButton && (
            <button
              onClick={closeModal}
              className="text-center w-full close-modal-textbtn  border-custom-green border !text-custom-green !bg-white"
            >
              {closeTitle}
            </button>
          )
        )}

        {addButton && closeTitle ? (
          <div className="flex justify-around">
            <button
              onClick={addButton}
              className="text-center w-[48%]  add-modal-textbtn"
            >
              تایید
            </button>

            <button
              onClick={closeModal}
              className="text-center w-[48%] close-modal-textbtn"
            >
              {closeTitle}
            </button>
          </div>
        ) : null}
      </div>
    </Modal1>
  );
};

export default BottomModal;
