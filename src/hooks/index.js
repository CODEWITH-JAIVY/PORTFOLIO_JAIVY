import { useState, useEffect, useRef } from "react";

export function useTyping(words, speed = 95, pause = 1800) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    const delay = deleting ? 45 : ci + 1 === word.length && !deleting ? pause : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, ci + 1));
        if (ci + 1 === word.length) { setDeleting(true); return; }
        setCi(c => c + 1);
      } else {
        setText(word.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDeleting(false);
          setWi(w => (w + 1) % words.length);
          setCi(0);
          return;
        }
        setCi(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, wi, ci, deleting, words, speed, pause]);

  return text;
}

export function useCounter(target, active, suffix = "+") {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / 80;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [active, target]);
  return val === 0 ? "0" : val + suffix;
}

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useMouseTilt(strength = 18) {
  const ref = useRef(null);
  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / strength;
    const y = (e.clientY - r.top - r.height / 2) / strength;
    ref.current.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
}
