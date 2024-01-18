import { ComponentPropsWithoutRef } from 'react';
import { Data } from './custom-select';

type SelectItemProps = {
  data: Data
  selected: string | '';
} & ComponentPropsWithoutRef<'div'>;

export const SelectItem = ({data, selected, ...props}:SelectItemProps) => {
    const {name, id, image} = data;
  return (
    <div
    role="option"
    id={id?.toString()}
    aria-selected={selected === name}
    {...props}
    >
      <div className="flex gap-2 items-center py-2 px-4">
        <img src={image} alt={data.name}  width={20} height={20} />
        <span>{name}</span>
      </div>
    </div>
  );
};
