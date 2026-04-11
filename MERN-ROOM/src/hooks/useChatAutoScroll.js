import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DEFAULT_THRESHOLD = 100;

export function useChatAutoScroll(itemCount, options = {}) {
  const threshold = options.threshold ?? DEFAULT_THRESHOLD;
  const containerRef = useRef(null);
  const endRef = useRef(null);
  const previousCountRef = useRef(itemCount);
  const scrollFrameRef = useRef(null);
  const shouldStickToBottomRef = useRef(true);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [showNewMessages, setShowNewMessages] = useState(false);

  const getDistanceFromBottom = () => {
    const container = containerRef.current;
    if (!container) return 0;

    return container.scrollHeight - container.scrollTop - container.clientHeight;
  };

  const scrollToBottom = (behavior = "smooth") => {
    endRef.current?.scrollIntoView({ behavior, block: "end" });
    setShowNewMessages(false);
    setIsNearBottom(true);
    shouldStickToBottomRef.current = true;
  };

  const forceScrollToBottom = (behavior = "auto") => {
    requestAnimationFrame(() => {
      scrollToBottom(behavior);
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateScrollState = () => {
      const nearBottom = getDistanceFromBottom() <= threshold;
      setIsNearBottom(nearBottom);
      shouldStickToBottomRef.current = nearBottom;

      if (nearBottom) {
        setShowNewMessages(false);
      }
    };

    const handleScroll = () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }

      scrollFrameRef.current = requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [threshold]);

  useLayoutEffect(() => {
    const hasNewItems = itemCount > previousCountRef.current;

    if (!hasNewItems) {
      previousCountRef.current = itemCount;
      return;
    }

    if (isNearBottom) {
      scrollToBottom(previousCountRef.current === 0 ? "auto" : "smooth");
    } else {
      setShowNewMessages(true);
    }

    previousCountRef.current = itemCount;
  }, [itemCount, isNearBottom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (shouldStickToBottomRef.current) {
        forceScrollToBottom("auto");
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    containerRef,
    endRef,
    isNearBottom,
    showNewMessages,
    scrollToBottom,
    forceScrollToBottom,
  };
}