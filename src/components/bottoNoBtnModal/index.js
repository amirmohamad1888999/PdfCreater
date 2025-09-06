import Modal1 from "react-modal";
import Image from "next/image";
import { useState, useEffect } from "react";
const BottomModal = ({
  isOpen,
  closeModal,
  title,
  children,
  icon,
  classNameWrapper,
  label,
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
      <div className="modal-container overflow-y-auto max-h-[80vh]">
        <div className={`flex justify-between ${label && label.length > 0 ?"items-start" :"items-center"}  modal-containerdiv`}>
          <div className="flex flex-col">
            {icon}
            <h2 className="mt-3 mr-2">{title}</h2>
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
      </div>
    </Modal1>
  );
};

export default BottomModal;
