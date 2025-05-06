"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TagInput({
  label,
  inputValue,
  onInputChange,
  onAddTag,
  onRemoveTag,
  tags,
  tagKey,
  error,
}) {
  return (
    <div>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <div className="flex gap-2 mb-2">
        <Input
          id={label.toLowerCase() + "Input"}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={`${label} name`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddTag();
            }
          }}
        />
        <Button type="button" onClick={onAddTag} size="sm">
          Add
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
            >
              {tag[tagKey]}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 ml-1"
                onClick={() => onRemoveTag(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
