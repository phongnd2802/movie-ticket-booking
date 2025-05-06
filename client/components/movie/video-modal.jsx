"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

export function VideoModal({ open, onOpenChange, trailerUrl }) {
  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(trailerUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 z-10 m-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="overflow-hidden rounded-lg">
            {embedUrl ? (
              <div className="aspect-video w-full max-w-5xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video w-full max-w-5xl bg-black flex items-center justify-center text-white">
                Video not available
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
