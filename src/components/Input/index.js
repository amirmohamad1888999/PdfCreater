import React from "react";
import style from "./index.module.css";

const Input = ({
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
  onClick,
  textErrorClassName,
  onInput,
  inputClassName
}) => {
  const toEnglishDigits = (str) =>
    str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const handleInputChange = (e) => { 
    let value = e.target.value;
   
    if (typeInput === "tel") {
      value = toEnglishDigits(value);
      if (!/^\d*$/.test(value)) return;
    }
  
    if (inputChangeHandler) {
      inputChangeHandler(value); 
    }
  };
  

  const handlePaste = (e) => {
    e.preventDefault(); 
    let pasteData = e.clipboardData.getData("text");
  
    if (typeInput === "tel") {
      pasteData = toEnglishDigits(pasteData);
      if (!/^\d*$/.test(pasteData)) return; 
    }
  
    if (inputChangeHandler) {
      inputChangeHandler(pasteData);
    }
  };

  return (
    <>
      <div className="relative w-full text-right " dir="rtl">
        {textArea ? (
          <textarea
            rows={countRowTextArea}
            className={`w-full text-right pt-[12px] pb-[12px] pr-[8px] pl-[8px] text-black text-[14px] outline-none ${
              textError ? "border-[#BA1200]" : "border-[#cacaca]"
            }`}
            placeholder={rightPlaceHolder}
            maxLength={maxLength}
            type={typeInput}
            onPaste={handlePaste}
            value={inputValue}
            onChange={handleInputChange}
          />
        ) : (
          <>
            <div className="relative w-full text-right h-[56px]" dir="rtl">
              <input
                className={`${
                  style.input
                } w-full text-right pt-[12px] pb-[12px] pr-[8px] pl-[8px] border ${inputClassName} border-solid ${
                  textError ? "border-[#BA1200]" : "border-[#cacaca]"
                } rounded-lg text-black ${isDisabled && "bg-[#F6F6F6]"}`}
                placeholder={rightPlaceHolder}
                maxLength={maxLength}
                type={typeInput}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={onBlurHandler}
                disabled={isDisabled}
                onPaste={handlePaste}
                onClick={onClick}
                onInput={onInput}
                style={{
                  paddingLeft: "30px",
                  fontFamily: "dana-fanum",
                }}
              />
            </div>

            {!isDisabled && inputValue && (
              <div
                className="absolute top-3 left-1 z-50 bg-white "
                onClick={deleteInputHandler}
              >
                <img
                  src="/svg/closeButton.svg"
                  alt="closeButton"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </>
        )}
        {!inputValue && (
          <div
            className={`${style.leftplaceHolder} absolute  text-place-holder`}
          >
            {leftPlaceHolder}
          </div>
        )}
        {textError && (
          <div
            className={`h-[24px] font-normal text-xs leading-24 flex items-center justify-start text-[#BA1200] mb-2 w-full -mt-1 ${textErrorClassName}`}
          >
            {textError}
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
