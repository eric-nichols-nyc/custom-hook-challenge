import { useRef, useState, useEffect } from "react";
import { Icon } from "./icon";
import { Input } from "./input";
import { SelectItem } from "./select-item";
import { useDropdown } from "../useDropdown";

export type Data = {
  id: number;
  name: string;
  image: string;
};

type SelectProps<T> = {
  data: T[];
  placeholder?: string;
};

export const Select = ({ data, placeholder }: SelectProps<Data>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    focused,
    showMenu,
    selected,
    filteredData,
    activeIndex,
    setActiveIndex,
    handleOnInputChange,
    setFocused,
    setShowMenu,
    setSelected,
  } = useDropdown(data);
  // const [focused, setFocused] = useState(false);
  // const [showMenu, setShowMenu] = useState(false);
  // const [selected, setSelected] = useState<string | ''>('');
  // const [filteredData, setFilteredData] = useState<Data[] | null>(data);
  // const [activeIndex, setActiveIndex] = useState(-1);

  const handleOnSelectFocus = () => {
    setFocused(true);
    setShowMenu(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const handleOnOptionSelect = (name: string) => {
    setSelected(name);
    inputRef.current?.blur();
    setShowMenu(false);
  };

  // const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelected(e.target.value);
  //   setFilteredData(data.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
  // };

  // const handleOnKeyDown = (e: KeyboardEvent) => {
  //   if (!filteredData) return;
  //   switch (e.key) {
  //     case 'ArrowDown':
  //       e.preventDefault();
  //       if (activeIndex === filteredData?.length - 1) {
  //         setActiveIndex(0);
  //       } else {
  //         setActiveIndex((prev) => prev + 1);
  //       }
  //       return;
  //     case 'ArrowUp':
  //       e.preventDefault();
  //       if (activeIndex === 0) {
  //         setActiveIndex(filteredData?.length - 1);
  //       } else {
  //         setActiveIndex((prev) => prev - 1);
  //       }
  //       return;
  //     case 'Enter':
  //       if (filteredData) {
  //         setSelected(filteredData[activeIndex].name);
  //         setShowMenu(false);
  //       }
  //       return;
  //     case 'Escape':
  //       setShowMenu(false);
  //       return;
  //     case 'Delete':
  //       setShowMenu(true);
  //       return;
  //     default:
  //       break;
  //   }
  // };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setFocused(false);
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // useEffect(() => {
  //   document.addEventListener('keydown', handleOnKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleOnKeyDown);
  //   };
  // }, [activeIndex, filteredData]);

  return (
    <>
      <div
        className={`w-[300px] rounded-md ${
          focused && "border-2 border-blue-500"
        }`}
      >
        <div
          role="combobox"
          aria-controls="data-list"
          aria-expanded={showMenu}
          aria-haspopup="listbox"
          className={`flex justify-between bg-slate-100 p-3 rounded-md ${
            focused && "bg-transparent"
          }`}
        >
          <Input
            ref={inputRef}
            className="w-full bg-transparent focus:outline-none text-sm font-semibold"
            onFocus={handleOnSelectFocus}
            onChange={handleOnInputChange}
            type="text"
            placeholder={placeholder}
            value={selected || ""}
          />
          <div
            className="cursor-pointer"
            role="button"
            tabIndex={-1}
            onKeyDown={handleOnSelectFocus}
            onClick={handleOnSelectFocus}
          >
            <Icon />
          </div>
        </div>
        <div
          id="data-list"
          className={`bg-white rounded-md mt-1 overflow-y-auto max-h-60 ${
            showMenu ? "block" : "hidden"
          }`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby="data-list"
          aria-expanded={showMenu}
        >
          {showMenu ? (
            <>
              {filteredData?.map((data: Data, idx) => {
                return (
                  <SelectItem
                    key={data.id}
                    data={data}
                    selected={selected}
                    className={`cursor-pointer rounded-md text-sm font-semibold ${
                      activeIndex === idx && "bg-slate-100"
                    }`}
                    onKeyDown={() => void 0}
                    onMouseOver={() => setActiveIndex(idx)}
                    onFocus={() => void 0}
                    onClick={() => handleOnOptionSelect(data.name)}
                    tabIndex={-1}
                  />
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
