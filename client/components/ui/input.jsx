import * as React from "react";
import clsx from "clsx";
import { cn } from "@/lib/utils";

const Input = ({ type, className, children, placeHolder }) => {
  return (
    <div className={cn("flex border-b border-[#b4b5c8]", className)}>
      <label>{children}</label>
      <input
        type={type}
        className={cn(
          "h-9 w-full border-none px-[10px] py-[12px] text-sm outline-none bg-white"
        )}
        placeholder={placeHolder}
      />
    </div>
  );
};

export { Input };
