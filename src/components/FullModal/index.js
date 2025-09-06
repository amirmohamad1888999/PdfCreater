import Modal1 from "react-modal";
const FullModal = ({
  isOpen,
  closeModal,
  children,
}) => {
  return (
    <Modal1
      isOpen={isOpen}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      portalClassName="full-modal-wrapper"
      closeTimeoutMS={400}
      overlayClassName={"overlayselect"}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
    >
      <div className="modal-container">
        {children}
      </div>
    </Modal1>
  );
};

export default FullModal;
