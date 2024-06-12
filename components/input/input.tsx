import React from "react";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  error?: FieldError;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { error, name } = props;

    return (
      <>
        <input
          ref={ref}
          {...props}
          className={twMerge(
            "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5",
            props.className
          )}
        />
        {error && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            {error.message}.
          </p>
        )}
      </>
    );
  }
);

Input.displayName = "Input";
