import React from "react";
import style from "./index.module.css";
const LeftStaticInput = ({
  maxLength,
  typeInput,
  inputValue,
  inputChangeHandler,
  rightPlaceHolder,
  leftPlaceHolder,
  textArea,
  countRowTextArea,
  textError,
  onBlurHandler,
  deleteInputHandler,
  isDisabled,
}) => {
  const handleInputChange = (e) => {
    if (typeInput === "tel" && !/^\d*$/.test(e.target.value)) {
      // If typeInput is "tel" and the entered value is not a number, prevent it from being updated
      return;
    }
    inputChangeHandler(e);
  };
  return (
    <div className="relative w-full text-right h-[56px]" dir="rtl">
      <div className="w-full flex">
        <input
          className={`${
            style.input
          } w-11/12 pt-[12px] pb-[12px] pr-[8px] pl-[8px] border border-solid ${
            textError ? "border-[#BA1200]" : "border-[#cacaca]"
          } rounded-lg text-black ${isDisabled && "bg-[#EAEAEA]"} text-left`}
          placeholder={rightPlaceHolder}
          maxLength={maxLength}
          type={typeInput}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={onBlurHandler}
          disabled={isDisabled}
        />
        <div
          className={`${
            style.input
          } w-1/12 flex justify-center items-center pt-[12px] pb-[12px] pr-[8px] pl-[8px] border border-solid ${
            textError ? "border-[#BA1200] text-[#BA1200]" : "border-[#cacaca]  text-black"
          } rounded-lg ${isDisabled && "bg-[#EAEAEA]"}`}
        >
          IR
        </div>
      </div>
      {textError && (
        <div className="h-[24px] font-normal text-xs leading-24 flex items-center justify-start text-[#BA1200]">
          {textError}
        </div>
      )}
    </div>
  );
};

export default LeftStaticInput;
