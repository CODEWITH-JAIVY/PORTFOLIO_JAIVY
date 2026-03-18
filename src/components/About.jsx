import { useInView } from "../hooks";
import styles from "./About.module.css";

const INFO = [
  ["Name", "Sanjeet Kumar"],
  ["Role", "Full Stack Developer"],
  ["Email", "skkarmasi421@gmail.com"],
  ["Phone", "+91 7261075889"],
  ["GitHub", "CODEWITH-JAIVY"],
  ["Status", "Open to Work ✓"],
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className={`section section--alt ${styles.about}`}>
      <div ref={ref} className={`reveal ${inView ? "in-view" : ""}`}>
        <div className="section__label">01 — About Me</div>
        <h2 className="section__title">
          The Developer
          <br />
          <span className="gradient-text">Behind The Code</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {/* Photo */}
        <div
          className={`reveal delay-1 ${inView ? "in-view" : ""} ${styles.photoSide}`}
        >
          <div className={styles.photoFrame}>
            <div className={styles.photoInner}>
              <img
                src="/codewithjaivy.jpeg"
                alt="Sanjeet Kumar"
                className={styles.photoImg}
              />
            </div>
            <div className={styles.frameDeco} />
          </div>
          <div className={styles.experienceBadge}>
            <div className={styles.expNum}>10+</div>
            <div className={styles.expLabel}>Technologies</div>
          </div>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Available Now
          </div>
        </div>

        {/* Text */}
        <div
          className={`reveal delay-2 ${inView ? "in-view" : ""} ${styles.textSide}`}
        >
          <h3 className={styles.greeting}>Hey there, I am Sanjeet 👋</h3>
          <p className={styles.bio}>
            I am a passionate Java Backend Developer with a strong foundation in
            Core Java, Spring Boot, and Data Structures and Algorithms. I love
            building scalable RESTful APIs and crafting full-stack experiences.
          </p>
          <p className={styles.bio}>
            I focus on writing clean, efficient, and maintainable code.
            Currently seeking an opportunity to apply my skills and grow as a
            software engineer at a forward-thinking company.
          </p>

          <div className={styles.infoGrid}>
            {INFO.map(([k, v]) => (
              <div key={k} className={styles.infoItem}>
                <span className={styles.infoKey}>{k}</span>
                <span
                  className={styles.infoVal}
                  style={k === "Status" ? { color: "var(--green)" } : {}}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.ctas}>
            <button
              className="btn-primary"
              onClick={() =>
                window.open(
                  "/Sanjeet Kumar - Java Backend Developer Resume (2).pdf",
                  "_blank",
                )
              }
            >
              ⬇ Resume
            </button>
            <button
              className={styles.btnOutline}
              onClick={() =>
                window.open("/Sanjeet_Kumar_Cover_Letter_java.pdf", "_blank")
              }
            >
              ⬇ Cover Letter
            </button>
            <a
              href="https://github.com/CODEWITH-JAIVY"
              target="_blank"
              rel="noreferrer"
              className={styles.btnOutline}
            >
              GitHub Profile ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}