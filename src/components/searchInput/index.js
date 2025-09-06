import React, { useState } from "react";
import style from "./index.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
const SerachInput = ({
  maxLength,
  typeInput,
  inputValue,
  inputChangeHandler,
  rightPlaceHolder,
  deletValueHandler,
  throttledSearchItems,
  searchItem,
  showSearchItem,
  selectedSearchItemHandler,
  inputContainerStyle,
  searchLoading,
  ButtonUrl,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleInputChange = (e) => {
    if (typeInput === "tel" && !/^\d*$/.test(e.target.value)) {
      return;
    }
    const value = e.target.value;
    inputChangeHandler(e);
    if (value.length > 2) {
      throttledSearchItems(value);
    }
  };
  return (
    <div
      className={`${inputContainerStyle} relative w-full text-right rtl`}
    >
      {/* {ButtonUrl && (
        <button
          className={`${style.input} w-full text-right pt-[12px] pb-[12px] pr-[8px] pl-[8px] `}
          onClick={() => {
            router.push(`${ButtonUrl}`);
          }}
        >
          <img
            src="/svg/searchIcon.svg"
            alt="rightArrow"
            width={24}
            height={24}
            priority
          />
          جستجو ...{" "}
        </button>
      )} */}
      {!ButtonUrl && (
        <div className="relative ">
          <div className={`absolute right-3 top-2.5`}>
            <img
              src="/svg/searchIcon.svg"
              alt="rightArrow"
              width={24}
              height={24}
              priority
            />
          </div>
          <input
            className={`${style.input} w-full text-right pt-[12px] pb-[12px] pr-10 pl-[8px] `}
            placeholder={rightPlaceHolder}
            maxLength={maxLength}
            type={typeInput}
            value={inputValue}
            onChange={handleInputChange}
            style={{
              paddingLeft: "30px"
            }}
          />
        </div>
      )}
      {inputValue && (
        <div
          className={`${style.leftcloseBtn} absolute z-50 bg-white left-1`}
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
      {!ButtonUrl && showSearchItem && inputValue && (
        <div className={`${style.bottomMenuContainer} bg-white w-full`}>
          {searchLoading ? (
            <div className="text-center text-black">در حال جستجو...</div>
          ) : (
            <>
              {searchItem &&
                searchItem.map((item) => {
                  return (
                    <>
                      <div
                        className={`${style.bottomMenu}`}
                        onClick={() => selectedSearchItemHandler(item)}
                      >
                        <div className={`${style.terminalPic}`}>
                          <img
                            src={
                              item.pictures.length > 0
                                ? item.pictures[0].fileLink
                                : ""
                            }
                            alt={
                              item.pictures.length > 0
                                ? item.pictures[0].fileName
                                : ""
                            }
                            className="h-12 w-12"
                          />
                        </div>
                        <div className="flex flex-col justify-center items-center ">
                          <div className="flex items-center">
                            <span className={`${style.itemName} text-black`}>
                              {item.title && item.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}

              {!searchItem.length > 0 && (
                <div className="text-black text-center">موردی یافت نشد.</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SerachInput;
