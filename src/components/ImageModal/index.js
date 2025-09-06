import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import ReactImageZoom from 'react-image-zoom';

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  const props = {
    width: 600,
    height: 600,
    zoomWidth: 500,
    img: imageUrl,
    scale: 1.5,
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="relative">
        <button 
          onClick={onRequestClose}
          className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>
        <ReactImageZoom {...props} />
      </div>
    </Modal>
  );
};