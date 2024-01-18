import { useRef, useState } from 'react';
import {Icon} from './icon';

type Data = {
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

  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Data[] | null>(data);

  const handleOnFocus = () => {
    setFocused(true);
    setShowMenu(true);
    setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select(); 
    })
  };

  const handleOnSelect = (name: string) => {
    setSelected(name);
    inputRef.current?.blur();
    setShowMenu(false);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected
    setFilteredData(data.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <div className={`w-[300px] rounded-md ${focused && 'border-2 border-blue-500'}`}>
      <div role="combobox"
          aria-controls='data-list'
          aria-expanded={showMenu}
          aria-haspopup="listbox"
          className="flex justify-between bg-slate-100 p-3 rounded-md"
        >
        <input
          ref={inputRef}
          className="w-full bg-slate-100 focus:outline-none text-sm font-semibold"
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          type="text"
          placeholder={placeholder}
          defaultValue={selected || ''}
        />
        <div 
         className="cursor-pointer"
         role="button"
         tabIndex={-1}
         onKeyDown={handleOnFocus}
         onClick={handleOnFocus}
        >
        <Icon />
        </div>
      </div>
      <div
        id="data-list"
        className={`bg-white rounded-md mt-1 overflow-y-auto max-h-60 ${showMenu ? 'block' : 'hidden'}`}
        role="listbox"
        tabIndex={-1}
        aria-labelledby="data-list"
        aria-expanded={showMenu}
      >
        {showMenu ? (
          <>
            {filteredData?.map((data:Data) => {
              return (
                <div 
                    key={data.id} 
                    role="option"
                    id={data.id.toString()}
                    aria-selected={selected === data.name}
                    className={`hover:bg-slate-100 cursor-pointer rounded-md text-sm font-semibold ${selected === data.name && 'bg-slate-100'}`}
                    onKeyDown={() => handleOnSelect(data.name)}
                    onClick={() => handleOnSelect(data.name)}
                    tabIndex={-1}
                >
                  <div className="flex gap-2 items-center py-2 px-4">
                    <img src={data.image} alt="fruit" width={20} height={20} />
                    <span>{data.name}</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};
