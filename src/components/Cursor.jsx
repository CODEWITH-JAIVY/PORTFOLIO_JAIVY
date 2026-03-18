import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX - 4 + "px";
        dot.current.style.top  = e.clientY - 4 + "px";
      }
    };

    const follow = () => {
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      pos.current.x += dx * 0.1;
      pos.current.y += dy * 0.1;
      if (ring.current) {
        ring.current.style.left = pos.current.x - 16 + "px";
        ring.current.style.top  = pos.current.y - 16 + "px";
      }
      raf.current = requestAnimationFrame(follow);
    };

    const enterLink = () => {
      if (ring.current) {
        ring.current.style.width = "54px";
        ring.current.style.height = "54px";
        ring.current.style.borderColor = "rgba(139,92,246,.9)";
        ring.current.style.marginLeft = "-11px";
        ring.current.style.marginTop = "-11px";
      }
    };
    const leaveLink = () => {
      if (ring.current) {
        ring.current.style.width = "32px";
        ring.current.style.height = "32px";
        ring.current.style.borderColor = "rgba(139,92,246,.5)";
        ring.current.style.marginLeft = "0";
        ring.current.style.marginTop = "0";
      }
    };

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[role=button]").forEach(el => {
      el.addEventListener("mouseenter", enterLink);
      el.addEventListener("mouseleave", leaveLink);
    });

    raf.current = requestAnimationFrame(follow);
    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ position:"fixed", pointerEvents:"none", zIndex:9999 }} />
      <div ref={ring} className="cursor-ring" style={{ position:"fixed", pointerEvents:"none", zIndex:9998 }} />
    </>
  );
}
