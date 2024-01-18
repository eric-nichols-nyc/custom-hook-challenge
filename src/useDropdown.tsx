import { useEffect, useState } from "react";

export const useDropdown = <T extends { name: string }>(data: T[]) => {
  // State variables using React hooks
  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
  const [selected, setSelected] = useState<string | "">(""); // Stores the selected value
  const [filteredData, setFilteredData] = useState<T[] | null>(data);// Stores the filtered data
  const [activeIndex, setActiveIndex] = useState(-1); // Stores the active index of the dropdown menu

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (!filteredData) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (activeIndex === filteredData?.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => prev + 1);
        }
        return;
      case "ArrowUp":
        e.preventDefault();
        if (activeIndex === 0) {
          setActiveIndex(filteredData?.length - 1);
        } else {
          setActiveIndex((prev) => prev - 1);
        }
        return;
      case "Enter":
        if (filteredData) {
          setSelected(filteredData[activeIndex].name);
          setShowMenu(false);
        }
        return;
      case "Escape":
        setShowMenu(false);
        return;
      case "Delete":
        if (filteredData) {
          setShowMenu(true);
        }
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("keydown", handleOnKeyDown);
    } else {
      document.removeEventListener("keydown", handleOnKeyDown);
    }
    return () => document.removeEventListener("keydown", handleOnKeyDown);
  }, [showMenu, activeIndex, filteredData]);

  return {
    focused,
    setFocused,
    showMenu,
    setShowMenu,
    selected,
    setSelected,
    filteredData,
    activeIndex,
    setActiveIndex,
    setFilteredData,
  };
};
