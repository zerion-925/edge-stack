import { Button } from "@edge-stack/ui/components/button";
import {
  SparklesIcon,
  type SparklesIconHandle,
} from "@edge-stack/ui/components/sparkles-icon";
import { useCallback, useRef } from "react";

export function AnimatedIconDemo() {
  const icon = useRef<SparklesIconHandle | null>(null);
  const start = useCallback(() => icon.current?.startAnimation(), []);
  const stop = useCallback(() => icon.current?.stopAnimation(), []);

  return (
    <section aria-labelledby="animated-icons-title">
      <h2 id="animated-icons-title">Animated icons</h2>
      <p>
        Hover, focus or activate to preview AnimateIcons. Reduced motion is
        respected.
      </p>
      <Button
        onBlur={stop}
        onClick={start}
        onFocus={start}
        onMouseEnter={start}
        onMouseLeave={stop}
        type="button"
        variant="outline"
      >
        <SparklesIcon aria-hidden="true" ref={icon} size={20} />
        Preview animation
      </Button>
    </section>
  );
}
