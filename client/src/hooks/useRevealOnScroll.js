import { useEffect } from "react";

export default function useRevealOnScroll(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("active");
          observer.disconnect(); // run once
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);
}
