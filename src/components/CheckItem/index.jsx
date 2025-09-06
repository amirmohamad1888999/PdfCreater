const CheckItem = ({ 
  items, 
  selectedItems = [], 
  setSelectedItems, 
  isMultiSelect = true, 
  idKey = 'id', 
  labelKey = 'label'
}) => {
  const handleSelect = (item) => {
    const itemId = item[idKey];
    
    if (isMultiSelect) {
      // Multiselect behavior
      if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    } else {
      // Single select behavior
      if (selectedItems.includes(itemId)) {
        setSelectedItems([]);
      } else {
        setSelectedItems([itemId]);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <label
          key={item[idKey]}
          className="flex items-center gap-2 cursor-pointer border border-gray-300 border-solid py-2 px-2 rounded-md"
        >
          <input
            type="checkbox"
            checked={selectedItems.includes(item[idKey])}
            onChange={() => handleSelect(item)}
            className="accent-[#009640] w-4 h-4"
          />
          <span className="text-sm">{item[labelKey]}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckItem;
