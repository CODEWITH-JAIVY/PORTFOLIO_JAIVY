import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

const WORDS = [
  "Java Engineer",
  "Spring Boot Dev",
  "React Developer",
  "AWS Cloud Dev",
  "DSA Enthusiast",
];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [counts, setCounts] = useState({ p: 0, t: 0, r: 0, l: 0 });

  useEffect(() => {
    const word = WORDS[wi];
    const delay = deleting
      ? 45
      : ci + 1 === word.length && !deleting
        ? 1800
        : 95;
    const timer = setTimeout(() => {
      if (!deleting) {
        setTyped(word.slice(0, ci + 1));
        if (ci + 1 === word.length) {
          setDeleting(true);
          return;
        }
        setCi((c) => c + 1);
      } else {
        setTyped(word.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDeleting(false);
          setWi((w) => (w + 1) % WORDS.length);
          setCi(0);
          return;
        }
        setCi((c) => c - 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [typed, wi, ci, deleting]);

  useEffect(() => {
    let frame = 0;
    const total = 80;
    const t = setInterval(() => {
      frame++;
      const progress = frame / total;
      setCounts({
        p: Math.floor(11 * progress),
        t: Math.floor(15 * progress),
        r: Math.floor(40 * progress),
        l: Math.floor(200 * progress),
      });
      if (frame >= total) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Left — Name + Photo side by side */}
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Open to opportunities
        </div>

        {/* Name row — photo circle sits right next to name */}
        <div className={styles.nameRow}>
          <div className={styles.nameBlock}>
            <h1 className={styles.name}>
              <span className={styles.nameLine1}>Sanjeet</span>
              <span className={styles.nameLine2}>Kumar</span>
            </h1>
          </div>

          {/* 3D Circle Photo */}
          <div className={styles.photoSection}>
            <div className={styles.ring1} />
            <div className={styles.ring2} />
            <div className={styles.ring3} />
            <div className={styles.photoGlow} />
            <div className={styles.photoCircle}>
              <img
                src="/JAIVYIMAGEFORPORTFOLIO.jpeg"
                alt="Sanjeet Kumar"
                className={styles.photoImg}
              />
            </div>
            <div className={styles.dot1} />
            <div className={styles.dot2} />
            <div className={styles.dot3} />
          </div>
        </div>

        <p className={styles.role}>
          <span className={styles.roleMuted}>I build as a </span>
          <span className={styles.typed}>{typed}</span>
          <span className={styles.caret}>|</span>
        </p>

        <p className={styles.desc}>
          Passionate Java Backend Developer building scalable RESTful APIs and
          full-stack applications. Strong in Spring Boot, AWS Cloud, React.js
          and Data Structures & Algorithms.
        </p>

        <div className={styles.actions}>
          <a href="#projects" className="btn-primary">
            <span>⚡</span> View Projects
          </a>
          <a href="#contact" className="btn-outline">
            <span>✉</span> Let's Talk
          </a>
        </div>

        <div className={styles.stats}>
          {[
            ["Projects", counts.p + "+"],
            ["Technologies", counts.t + "+"],
            ["Repositories", counts.r + "+"],
            ["LeetCode", counts.l + "+"],
          ].map(([label, val]) => (
            <div key={label} className={styles.stat}>
              <div className={styles.statNum}>{val}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Card */}
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <div className={styles.cardGlow} />
          <div className={styles.cardHeader}>
            <div className={styles.avatar}>SK</div>
            <div>
              <div className={styles.cardName}>Sanjeet Kumar</div>
              <div className={styles.cardSub}>Full Stack Developer</div>
            </div>
          </div>
          <div className={styles.cardDivider} />
          <div className={styles.stackLabel}>Tech Stack</div>
          <div className={styles.cardPills}>
            {["Java", "Spring Boot", "React", "AWS", "MySQL", "DSA"].map(
              (s) => (
                <span key={s} className="pill">
                  {s}
                </span>
              ),
            )}
          </div>
          <div className={styles.cardDivider} />
          <div className={styles.cardStatus}>
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} />
              <span>Available for work</span>
            </div>
            <a
              href="https://github.com/CODEWITH-JAIVY"
              target="_blank"
              rel="noreferrer"
              className={styles.ghLink}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
