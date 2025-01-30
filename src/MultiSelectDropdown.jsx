import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FixedSizeList as List } from "react-window";
import memoize from "memoize-one";

const MultiSelectDropdown = ({
  data = [],
  width = "300px",
  height = "400px",
  inputHeight = "38px",
  backgroundColor = "#ffffff",
  textColor = "#333333",
  hoverColor = "#f0f0f0",
  onChange = () => {},
  multiSelect = false,
  selectedColor = "#e0e0e0",
  placeholder = "Select items...",
  dropdownStyles = {},
  itemPadding = "8px 12px",
  showSelected = false,
  maxDisplayItems = 1,
  inputFontSize = "14px",
  dropdownFontSize = "14px",
  inputPadding = "0 8px",
  checkmarkColor = "#2196f3",
  clearButtonColor = "#666",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Set());
  const wrapperRef = useRef(null);

  // Add this useEffect to sync with parent
  useEffect(() => {
    onChange(Array.from(selectedItems));
  }, [selectedItems, onChange]);

  // Value-to-title map
  const valueMap = useMemo(
    () => new Map(data.map((item) => [item.value, item.title])),
    [data]
  );

  // Display string calculation
  const displayString = useMemo(() => {
    if (!showSelected || selectedItems.size === 0) return "";
    const selectedValues = Array.from(selectedItems);
    const titles = selectedValues.map((v) => valueMap.get(v)).filter(Boolean);

    if (titles.length > maxDisplayItems) {
      const visible = titles.slice(0, maxDisplayItems).join(", ");
      return `${visible}, +${titles.length - maxDisplayItems}`;
    }
    return titles.join(", ");
  }, [selectedItems, showSelected, valueMap, maxDisplayItems]);

  // Filtered data
  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [data, searchTerm]
  );

  // Memoized item data
  const createItemData = memoize((items, selected) => ({
    items,
    selected,
    backgroundColor,
    textColor,
    hoverColor,
    selectedColor,
    itemPadding,
    checkmarkColor,
    dropdownFontSize,
  }));

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear search when closing
  useEffect(() => {
    if (!isOpen) setSearchTerm("");
  }, [isOpen]);

  const toggleAll = useCallback(() => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (prev.size === data.length) {
        next.clear();
      } else {
        data.forEach((item) => next.add(item.value));
      }
      return next;
    });
  }, [data]);

  const DropdownHeader = () => {
    if (!multiSelect) return null;
    return (
      <div
        style={{
          padding: "8px",
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: backgroundColor,
        }}
      >
        <input
          type="checkbox"
          checked={selectedItems.size === data.length && data.length > 0}
          onChange={toggleAll}
          style={{ cursor: "pointer" }}
        />
        <span style={{ fontSize: dropdownFontSize }}>
          {selectedItems.size === data.length ? "Unselect All" : "Select All"}
        </span>
      </div>
    );
  };

  const clearAll = useCallback(
    (e) => {
      e.stopPropagation();
      setSelectedItems(new Set());
      onChange([]);
    },
    [onChange]
  );

  // Add this function above the Row component definition
  const toggleItem = useCallback(
    (value) => {
      setSelectedItems((prev) => {
        if (multiSelect) {
          const next = new Set(prev);
          next.has(value) ? next.delete(value) : next.add(value);
          return next;
        } else {
          // Single selection mode
          return prev.has(value) ? new Set() : new Set([value]);
        }
      });
    },
    [multiSelect] // Add dependency
  );

  useEffect(() => {
    if (selectedItems.size === 0 && data.length > 0) {
      // Initialize with empty set when data loads
      onChange(Array.from(selectedItems));
    }
  }, [data]);

  const Row = ({ index, style, data }) => {
    const [isHovered, setIsHovered] = useState(false);
    const item = data.items[index];
    const isSelected = data.selected.has(item.value);

    return (
      <button
        type="button"
        style={{
          ...style,
          padding: data.itemPadding,
          cursor: "pointer",
          backgroundColor: isHovered
            ? data.hoverColor
            : isSelected
            ? data.selectedColor
            : data.backgroundColor,
          color: data.textColor,
          border: "none",
          textAlign: "left",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: data.dropdownFontSize,
          transition: "background-color 0.2s",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => toggleItem(item.value)}
      >
        <span>{item.title}</span>
        {isSelected && (
          <span style={{ color: data.checkmarkColor, marginLeft: "8px" }}>
            ✓
          </span>
        )}
      </button>
    );
  };

  const itemData = createItemData(filteredData, selectedItems);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width }}>
      <div
        style={{
          padding: "0",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor,
          cursor: "pointer",
          height: inputHeight,
          boxSizing: "border-box",
          position: "relative",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={isOpen ? searchTerm : displayString}
          readOnly={!isOpen}
          onChange={(e) => isOpen && setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            color: textColor,
            height: "100%",
            cursor: "pointer",
            boxSizing: "border-box",
            fontSize: inputFontSize,
            padding: inputPadding,
            lineHeight: 1.5,
            paddingRight: "30px",
          }}
        />

        {selectedItems.size > 0 && (
          <button
            type="button"
            onClick={clearAll}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: clearButtonColor,
              cursor: "pointer",
              fontSize: "18px",
              padding: "0 4px",
              lineHeight: 1,
            }}
            aria-label="Clear all selections"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            maxHeight: height,
            marginTop: "4px",
            backgroundColor,
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 1000,
            fontSize: dropdownFontSize,
            ...dropdownStyles,
          }}
        >
          <DropdownHeader />
          <List
            height={
              Math.min(400, filteredData.length * 35) - (multiSelect ? 45 : 0)
            } // Adjust for header
            itemCount={filteredData.length}
            itemSize={35}
            width={width}
            itemData={itemData}
          >
            {Row}
          </List>
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiSelectDropdown);
