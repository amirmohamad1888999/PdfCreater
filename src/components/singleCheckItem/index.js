const SingleCheckbox = ({label, isChecked, onCheckboxChange  }) => {
    return (
      <div className="w-full flex items-center gap-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheckboxChange(e.target.checked)}
          className="accent-[#009640] w-4 h-4"           
        />
        <label className="text-black text-right font-semibold text-xs leading-24">
          {label}
        </label>
      </div>
    );
  };
  
  export default SingleCheckbox;
  