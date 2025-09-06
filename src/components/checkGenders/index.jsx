const CheckItemWithImages = ({ items, selectedItems = [], setSelectedItems }) => {
    const handleSelect = (item) => {
      if (selectedItems.includes(item.id)) {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item.id));
      } else {
        setSelectedItems([...selectedItems, item.id]);
      }
    };
  
    return (
      <div className="flex gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer"
            onClick={() => handleSelect(item)}
          >
            <img
              src={selectedItems.includes(item.id) ? item.activeImage : item.inactiveImage}
              alt={item.label}
              className="w-10 h-10"
            />
          </div>
        ))}
      </div>
    );
  };
  
  export default CheckItemWithImages;
  