import React, { useState, useEffect } from 'react';
import './index.css';

const ToggleSwitch = ({ value, onChange, label }) => {
  const [isChecked, setIsChecked] = useState(value);
  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState); 
    }
  };

  return (
    <div className="flex justify-between w-full">
      {label && <span className="text-black font-bold text-[12px]">{label}</span>} 
      <label className="switch relative inline-block w-10 h-5">
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <span className="slider-check round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
