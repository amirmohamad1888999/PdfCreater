import style from "./index.module.css";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
const BottomModalBtn = ({
  inputValue,
  onclickHandler,
  rightPlaceHolder,
  deletValueHandler,
  disable,
  textError,
  isChange,
  textErrorClassName,

}) => {
  return (
    <div
      className={`relative w-full text-right h-fit border border-solid ${
        disable ? "opacity-40" : ""
      } ${
          textError ? "border-[#BA1200]" : " border-gray-300"
        } ${
          style.btnmodalinput
        } text-right pt-[12px] pb-[12px] pr-[8px] pl-[8px]  `}
      dir="rtl"
    >
      <div
        className={`w-11/12`}
        onClick={!disable ? onclickHandler : undefined}
      >
        {inputValue ? (
          <span className="text-black">{inputValue}</span>
        ) : (
          <span className={`${style.textrightplaceHolder}`}>
            {rightPlaceHolder}
          </span>
        )}

        {!inputValue && !isChange && (
          <div className={`${style.leftArrowModalBtn} absolute `}>
            <img
              src="/svg/leftArrowModalBtn.svg"
              alt="rightArrow"
              width={24}
              height={24}
              priority
            />
          </div>
        )}
      </div>
      {inputValue && !isChange && (
        <div
          className={`${style.leftcloseBtn} absolute`}
          onClick={deletValueHandler}
        >
           <img
              src="/svg/closeButton.svg"
              alt="closeButton"
              width={24}
              height={24}
            />
        </div>
      )}
       {textError && (
          <div
            className={`h-[24px] font-normal text-xs leading-24 flex items-center justify-start text-[#BA1200]  w-full ${textErrorClassName}`}
          >
            {textError}
          </div>
        )}
    </div>
  );
};
export default BottomModalBtn;
