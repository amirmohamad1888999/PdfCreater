import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CropModal = ({
  beforeCropImage,
  imageSrcHandler,
  closeModal,
  closeTitle,
  confirmationTitle,
  isSquare = false
}) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    ...(isSquare ? { aspect: 1 } : { height: 30 }) 
  });
  

  const cropDinamicImageNow = () => {
    if (!image || !crop.width || !crop.height) {
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop.x * scaleX, 
      crop.y * scaleY,
      crop.width * scaleX, 
      crop.height * scaleY, 
      0, 
      0,
      cropWidth, 
      cropHeight  
    );

    const mimeType = beforeCropImage.includes("image/png") ? "image/png" : "image/jpeg";
    const base64Image = canvas.toDataURL(mimeType, mimeType === "image/jpeg" ? 0.5 : 1.0);
    
    imageSrcHandler(base64Image);
    closeModal();
  };

  return (
    <>
      <div className="modal-content">
        <ReactCrop
          src={beforeCropImage}
          onImageLoaded={setImage}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          locked={false} 
          disabled={false}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={cropDinamicImageNow}
          className="text-center w-full close-modal-textbtn !bg-green-600 !text-white"
        >
          {confirmationTitle}
        </button>
        <button
          onClick={closeModal}
          className="text-center w-full close-modal-textbtn !bg-red-600 !text-white"
        >
          {closeTitle}
        </button>
      </div>

      <style jsx>{`
        .modal-content {
          display: flex;
          justify-content: center;
          align-items: center;
          max-height: 70vh; 
          overflow: hidden; 
      `}</style>
    </>
  );
};

export default CropModal;
