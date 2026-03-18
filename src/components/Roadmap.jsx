import { useInView } from "../hooks";
import styles from "./Roadmap.module.css";

const ROADMAP = [
  {
    icon: "☁️",
    title: "AWS Deep Dive",
    status: "in-progress",
    statusLabel: "In Progress",
    color: "#fbbf24",
    desc: "Advanced AWS services — Lambda, ECS, CloudFormation, S3, SQS, SNS, IAM policies and cloud architecture patterns.",
    items: [
      "AWS Lambda & Serverless",
      "ECS & Container Orchestration",
      "CloudFormation & IaC",
      "SQS / SNS Event Driven",
      "AWS Certification (SAA)",
    ],
  },
  {
    icon: "⚡",
    title: "Microservices In Depth",
    status: "in-progress",
    statusLabel: "In Progress",
    color: "#f472b6",
    desc: "Advanced microservices patterns — Saga, CQRS, Event Sourcing, distributed tracing, and service mesh with Istio.",
    items: [
      "Saga Pattern",
      "CQRS & Event Sourcing",
      "Distributed Tracing (Jaeger)",
      "Service Mesh (Istio)",
      "gRPC Communication",
    ],
  },
  {
    icon: "🔐",
    title: "Security Module",
    status: "planned",
    statusLabel: "Planned",
    color: "#f87171",
    desc: "Spring Security advanced — OAuth2, OpenID Connect, JWT refresh tokens, rate limiting, and API security best practices.",
    items: [
      "OAuth2 & OpenID Connect",
      "JWT Refresh Token Flow",
      "Rate Limiting & Throttling",
      "API Security Best Practices",
      "Penetration Testing Basics",
    ],
  },
  {
    icon: "🧮",
    title: "DSA Mastery",
    status: "in-progress",
    statusLabel: "In Progress",
    color: "#4ade80",
    desc: "Solving 500+ LeetCode problems, mastering advanced graph algorithms, DP optimization, and competitive programming.",
    items: [
      "200+ LeetCode Solved",
      "Advanced Graph Algorithms",
      "DP Optimization Techniques",
      "Segment Trees & BIT",
      "Target: 500+ Problems",
    ],
  },
];

const STATUS_COLORS = {
  "in-progress": {
    bg: "rgba(34,197,94,.12)",
    color: "#4ade80",
    dot: "#4ade80",
  },
  planned: { bg: "rgba(251,191,36,.12)", color: "#fbbf24", dot: "#fbbf24" },
  done: { bg: "rgba(139,92,246,.12)", color: "#8b5cf6", dot: "#8b5cf6" },
};

export default function Roadmap() {
  const [ref, inView] = useInView();

  return (
    <section className={`section ${styles.section}`}>
      <div ref={ref} className={`reveal ${inView ? "in-view" : ""}`}>
        <div className="section__label">08 — Learning Roadmap</div>
        <h2 className="section__title">
          What I'm
          <br />
          <span className="gradient-text">Learning Next</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {ROADMAP.map((item, i) => {
          const sc = STATUS_COLORS[item.status];
          return (
            <div
              key={i}
              className={`reveal delay-${(i % 4) + 1} ${inView ? "in-view" : ""} ${styles.card}`}
              style={{ "--accent": item.color }}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>{item.icon}</div>
                <span
                  className={styles.statusBadge}
                  style={{ background: sc.bg, color: sc.color }}
                >
                  <span
                    className={styles.statusDot}
                    style={{ background: sc.dot }}
                  />
                  {item.statusLabel}
                </span>
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
              <ul className={styles.items}>
                {item.items.map((it, j) => (
                  <li key={j} className={styles.item}>
                    <span className={styles.itemDot} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
