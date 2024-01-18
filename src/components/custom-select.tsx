import { useRef,useEffect } from "react";
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
    setFilteredData,
    activeIndex,
    setActiveIndex,
    setFocused,
    setShowMenu,
    setSelected,
  } = useDropdown(data);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    setShowMenu(true);
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleOnSelectFocus = () => {
    setFocused(true);
    setShowMenu(true);
    // select text on focus
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

  return (
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
          className={`combobox ${
            focused && "bg-transparent"
          }`}
        >
          <Input
            ref={inputRef}
            className="input"
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
          className={`list ${
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
                    className={`select ${
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
  );
};
