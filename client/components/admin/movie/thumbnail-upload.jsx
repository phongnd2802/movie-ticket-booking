"use client";

import { X, Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ThumbnailUpload({
  thumbnailPreview,
  onUploadClick,
  onClearThumbnail,
  error,
  required = false,
}) {
  return (
    <div>
      <Label htmlFor="movieThumbnail">
        Thumbnail {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="mt-2">
        {thumbnailPreview ? (
          <div className="relative w-full h-[200px] mb-4">
            <Image
              src={thumbnailPreview || "/placeholder.svg"}
              alt="Thumbnail preview"
              fill
              className="object-cover rounded-md"
            />
            {/* <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={onClearThumbnail}
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            onClick={onUploadClick}
          >
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}
