import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Wrapper } from "../page/wrapper";

export function HoverCardDemo({ title, items }) {
  return (
    <>
      {title && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex justify-center items-center">
              <Button
                variant="link"
                className="text-sm text-[#777] hover:text-[#F26B38]"
              >
                {title}
                <ChevronDown />
              </Button>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-whit w-auto border-none p-0 pb-1">
            <Wrapper items={items} />
          </HoverCardContent>
        </HoverCard>
      )}
    </>
  );
}
