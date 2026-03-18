import { useState } from "react";
import { CERTS } from "../data";
import { useInView } from "../hooks";
import styles from "./Certificates.module.css";

function CertCard({ data, inView, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`reveal delay-${delay} ${inView ? "in-view" : ""} ${styles.card} ${hovered ? styles.cardHover : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.iconWrap} style={{ "--c": data.color }}>
        {data.icon}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.issuer} style={{ color: data.color }}>{data.issuer}</div>
        <div className={styles.year}>
          <span className={styles.yearDot} style={{ background: data.color }} />
          {data.year}
        </div>
      </div>
      <div className={styles.arrow}>→</div>
    </div>
  );
}

export default function Certificates() {
  const [ref, inView] = useInView();

  return (
    <section id="certificates" className="section">
      <div ref={ref} className={`reveal ${inView ? "in-view" : ""}`}>
        <div className="section__label">04 — Certificates</div>
        <h2 className="section__title">
          Achievements &amp;<br />
          <span className="gradient-text">Certifications</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {CERTS.map((c, i) => (
          <CertCard key={i} data={c} inView={inView} delay={(i % 4) + 1} />
        ))}
      </div>
    </section>
  );
}
