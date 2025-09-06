import React, { useState } from "react";

const CustomDropdownInput = ({ isDisabled }) => {
  const options = [
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
    { id: 3, value: "Option 3" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDropdownToggle = () => {
    if (!isDisabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close dropdown on selection
  };

  const handleClearSelection = () => {
    setSelectedOption(null); // Clear the selected option
  };

  return (
    <div className="relative inline-block w-full">
      <div
        className={`border p-2 pt-[12px] pb-[12px] pr-[8px] pl-[8px] border-[#cacaca] rounded-lg text-[14px] ${selectedOption?"text-black":"text-gray-500"} cursor-pointer flex items-center justify-between`}
        onClick={handleDropdownToggle}
      >
        <span>{selectedOption ? selectedOption.value : "انتخاب کنید"}</span>

        {/* Show delete button when there is a selected option and input is not disabled */}
        {!isDisabled && selectedOption && (
          <div
            className="absolute top-2.5 left-2"
            onClick={handleClearSelection}
          >
            <img
              src="/svg/closeButton.svg"
              alt="closeButton"
              width={24}
              height={24}
            />
          </div>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute left-0 mt-1 w-full border border-gray-300 rounded-md bg-white shadow-md z-10 max-h-40 overflow-auto">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer  text-[14px] text-black"
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdownInput;
