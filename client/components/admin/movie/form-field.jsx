"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function FormField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  min,
  max,
  step,
  placeholder,
  multiline = false,
  rows = 5,
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={error ? "border-red-500" : ""}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={error ? "border-red-500" : ""}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
