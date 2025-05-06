import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ type, className, children, placeHolder, ...props }, ref) => {
  return (
    <div className={cn("flex border-b border-[#b4b5c8]", className)}>
      <label>{children}</label>
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-9 w-full border-none px-[10px] py-[12px] text-sm outline-none bg-white"
        )}
        placeholder={placeHolder}
        {...props} 
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
