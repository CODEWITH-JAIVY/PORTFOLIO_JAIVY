import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.logoMark}>SK</div>
        <span className={styles.copy}>© {year} Sanjeet Kumar</span>
      </div>
      <span className={styles.built}>
        Built with <span className={styles.heart}>♥</span> using React
      </span>
      <a href="mailto:skkarmasi421@gmail.com" className={styles.email}>
        skkarmasi421@gmail.com
      </a>
    </footer>
  );
}
