"use client";

import { cn } from "@edge-stack/ui/lib/utils";
import { Progress as ProgressPrimitive } from "radix-ui";
import type * as React from "react";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full",
        className
      )}
      data-slot="progress"
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="bg-primary size-full flex-1 transition-all"
        data-slot="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
