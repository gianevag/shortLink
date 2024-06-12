import { twMerge } from "tailwind-merge";

type LabelProps = React.HTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  htmlFor: string;
};

export const Label = ({ children, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={twMerge(
        "block mb-2 text-sm font-medium text-gray-900",
        props.className
      )}
    >
      {children}
    </label>
  );
};
