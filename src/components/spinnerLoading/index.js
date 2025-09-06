import React from "react";
const SpinnerLoading = ({ size }) => {
  return (
    <div className="w-full flex justify-center">
      <img
        src="/gif/SpinnerLoading.gif"
        alt="car"
        width={size ? size : 50}
        height={size ? size : 50}
      />
    </div>
  );
};
export default SpinnerLoading;
