import { ComponentPropsWithRef, forwardRef } from 'react';

type InputProps = {
  string?: string | '';
} & ComponentPropsWithRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({string, ...props }, ref) {
  return (
    <input
      className="w-full bg-transparent focus:outline-none text-sm font-semibold"
      ref={ref}
      {...props}
    />
  );
});
