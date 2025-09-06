import moment from "moment-jalaali";
import React from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import transition from "react-element-popper/animations/transition";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";
import "./index.css";
function DatePickerComponent({
  render,
  label,
  className,
  onChange,
  name,
  style,
  value,
  disabled,
  textError,
  onBlur
}) {
  function ConveertToPersian(date) {
    const originalDate = new Date(date);
    return moment(originalDate).format("jYYYY/jMM/jDD");
  }

  const handleChange = (newDate) => {
    onChange(ConveertToPersian(newDate?.toDate?.().toString()));
  };

  const mapDays = ({ date }) => {
    let props = {};
    let isWeekend = date.weekDay.index === 6;
    if (isWeekend) props.className = "highlight highlight-red";
    return props;
  };

  return (
    
    <div className={`mt-1 ${className}`}>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={handleChange}
        calendarPosition="bottom-center"
        inputClass={`${textError ? "datePickerInputError":"datePickerInput"}`}
        name={name}
        render={render}
        mapDays={mapDays}
        animations={[
          opacity(),
          transition({
            from: 40,
            transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
          }),
        ]}
        style={style}
        disabled={disabled}
        onClose={onBlur}
      />
      {textError && (
        <div className="h-[24px] font-normal text-xs leading-24 flex items-center justify-start text-[#BA1200]">
          {textError}
        </div>
      )}
    </div>
  );
}

export default DatePickerComponent;
