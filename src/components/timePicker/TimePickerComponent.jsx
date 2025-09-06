import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const TimePickerComponent = ({ className, label, name, DatePickerClassName, style, onBlur , value , onChange , required , textError,
}) => {
 
  return (
    <div className="relative w-full text-right " dir="rtl">
    <div className={`mt-1 ${className} `}>
    
      <DatePicker
        disableDayPicker
        format="HH:mm"
        plugins={[<TimePicker hideSeconds/>]}
        calendarPosition="bottom-center"
        className={` ${DatePickerClassName}`}
        inputClass={`datePickerInput`}
        name={name}
        value={value}
        onChange={onChange}
        style={style}
        onBlur={onBlur}
      />
    </div>
    {textError && (
          <div
            className={`h-[24px] font-normal text-xs leading-24 flex items-center justify-start text-[#BA1200] mb-2 w-full`}
          >
            {textError}
          </div>
        )}
    </div>
  );
};

export default TimePickerComponent;

// export const formatTime = (date) => {
//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   return `${hours}:${minutes}`;
// };