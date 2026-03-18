import { useState } from "react";
import { SKILLS } from "../data";
import { useInView } from "../hooks";
import styles from "./Skills.module.css";

function SkillCard({ data, inView, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`reveal delay-${delay} ${inView ? "in-view" : ""} ${styles.card} ${hovered ? styles.cardHover : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardTop}>
        <div className={styles.iconWrap} style={{ "--c": data.color }}>
          {data.icon}
        </div>
        <div>
          <div className={styles.catName}>{data.cat}</div>
          <div className={styles.catLevel}>{data.level}% proficiency</div>
        </div>
      </div>

      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{
            width: inView || hovered ? data.level + "%" : "0%",
            background: `linear-gradient(90deg, ${data.color}, ${data.color}88)`,
          }}
        />
      </div>

      <div className={styles.tags}>
        {data.tags.map(t => (
          <span key={t} className={styles.tag} style={{ "--c": data.color }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="section">
      <div ref={ref} className={`reveal ${inView ? "in-view" : ""}`}>
        <div className="section__label">02 — Skills</div>
        <h2 className="section__title">
          What I Work<br />
          <span className="gradient-text">With</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {SKILLS.map((s, i) => (
          <SkillCard key={i} data={s} inView={inView} delay={(i % 4) + 1} />
        ))}
      </div>
    </section>
  );
}
