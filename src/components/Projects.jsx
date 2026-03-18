import { useState, useEffect, useRef } from "react";
import { PROJECTS, TAG_META } from "../data";
import { useInView } from "../hooks";
import styles from "./Projects.module.css";

function ProjectModal({ data, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        <div className={styles.modalHero} style={{ background: data.bg }}>
          <span className={styles.modalEmoji}>{data.emoji}</span>
          <div className={styles.modalNum}>{data.num}</div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalTagRow}>
            {data.tags.map(t => (
              <span key={t} className={styles.modalTag}
                style={{ color: TAG_META[t]?.color, background: TAG_META[t]?.bg }}>
                {TAG_META[t]?.label}
              </span>
            ))}
          </div>
          <h2 className={styles.modalTitle}>{data.name}</h2>
          <p className={styles.modalSub}>{data.tagline}</p>
          <p className={styles.modalDesc}>{data.desc}</p>

          <div className={styles.modalSection}>Key Features</div>
          <ul className={styles.features}>
            {data.features.map((f, i) => (
              <li key={i} className={styles.feature}>
                <span className={styles.featureDot} style={{ background: data.accent }} />
                {f}
              </li>
            ))}
          </ul>

          <div className={styles.modalSection}>Tech Stack</div>
          <div className={styles.techStack}>
            {data.tech.map(t => <span key={t} className="pill">{t}</span>)}
          </div>

          <div className={styles.modalActions}>
            {data.live && (
              <a href={data.live} target="_blank" rel="noreferrer" className="btn-primary">
                ↗ Live Demo
              </a>
            )}
            <a href={data.github} target="_blank" rel="noreferrer" className="btn-outline">
              ⌥ View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ data, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHover : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className={styles.thumb} style={{ background: data.bg }}>
        <span className={styles.thumbEmoji}>{data.emoji}</span>
        <div className={styles.thumbNum} style={{ color: data.accent }}>{data.num}</div>
        <div className={`${styles.thumbOverlay} ${hovered ? styles.overlayVisible : ""}`}>
          {data.live && (
            <a href={data.live} target="_blank" rel="noreferrer"
              className={styles.liveBtn}
              style={{ background: data.accent }}
              onClick={(e) => e.stopPropagation()}>
              ↗ Live
            </a>
          )}
          <a href={data.github} target="_blank" rel="noreferrer"
            className={styles.codeBtn}
            onClick={(e) => e.stopPropagation()}>
            ⌥ Code
          </a>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.tagRow}>
          {data.tags.map(t => (
            <span key={t} className={styles.tag}
              style={{ color: TAG_META[t]?.color, background: TAG_META[t]?.bg }}>
              {TAG_META[t]?.label}
            </span>
          ))}
        </div>
        <h3 className={styles.name}>{data.name}</h3>
        <p className={styles.desc}>{data.desc.slice(0, 105)}…</p>
        <div className={styles.links}>
          {data.live && (
            <a href={data.live} target="_blank" rel="noreferrer" className={styles.link}
              onClick={(e) => e.stopPropagation()}>
              ↗ Live Demo
            </a>
          )}
          <a href={data.github} target="_blank" rel="noreferrer" className={styles.link}
            onClick={(e) => e.stopPropagation()}>
            ⌥ GitHub
          </a>
          <button className={styles.detailBtn} onClick={onClick}>Details →</button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [idx, setIdx] = useState(0);
  const [modal, setModal] = useState(null);
  const [ref, inView] = useInView();
  const trackRef = useRef(null);
  const visCount = 3;
  const maxIdx = PROJECTS.length - visCount;

  useEffect(() => {
    const t = setInterval(() => setIdx(i => i >= maxIdx ? 0 : i + 1), 4500);
    return () => clearInterval(t);
  }, [maxIdx]);

  useEffect(() => {
    if (!trackRef.current) return;
    const cardW = trackRef.current.children[0]?.offsetWidth ?? 0;
    trackRef.current.style.transform = `translateX(-${idx * (cardW + 24)}px)`;
  }, [idx]);

  return (
    <section id="projects" className="section section--alt">
      <div ref={ref} className={`reveal ${inView ? "in-view" : ""}`}>
        <div className="section__label">03 — Projects</div>
        <h2 className="section__title">
          Things I've<br />
          <span className="gradient-text">Built</span>
        </h2>
      </div>

      <div className={styles.sliderWrap}>
        <div ref={trackRef} className={styles.track}>
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} data={p} onClick={() => setModal(p)} />
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.arrow} onClick={() => setIdx(i => Math.max(0, i - 1))}>←</button>
        <div className={styles.dots}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === idx ? styles.dotActive : ""}`}
              onClick={() => setIdx(Math.min(i, maxIdx))}
            />
          ))}
        </div>
        <button className={styles.arrow} onClick={() => setIdx(i => Math.min(maxIdx, i + 1))}>→</button>
      </div>

      {modal && <ProjectModal data={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
