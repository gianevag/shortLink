import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
        props.className
      )}
    >
      {children}
    </button>
  );
};
