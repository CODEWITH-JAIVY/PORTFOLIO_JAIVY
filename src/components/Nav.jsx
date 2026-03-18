import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import styles from "./Nav.module.css";

const LINKS = ["about", "skills", "projects", "certificates", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 30);
      const ids = ["hero", ...LINKS, "testimonials", "github", "roadmap"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#hero" className={styles.logo}>
        <div className={styles.logoMark}>SK</div>
        <span className={styles.logoText}>Sanjeet Kumar</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {LINKS.map((l) => (
          <li key={l}>
            <a
              href={`#${l}`}
              className={`${styles.link} ${active === l ? styles.linkActive : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.navRight}>
        {/* Theme toggle */}
        <button
          className={styles.themeBtn}
          onClick={toggle}
          title="Toggle theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>
        <a href="#contact" className={styles.navCta}>
          Hire Me
        </a>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
