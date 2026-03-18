import { useState, useEffect } from "react";
import { useInView } from "../hooks";
import styles from "./Githubstats.module.css";

const USERNAME = "CODEWITH-JAIVY";

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  useEffect(() => {
    // Fetch user stats
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch top repos
    fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=4`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <section className={`section ${styles.section}`}>
      <div ref={ref} className={`reveal ${inView ? "in-view" : ""}`}>
        <div className="section__label">07 — GitHub</div>
        <h2 className="section__title">
          Live GitHub
          <br />
          <span className="gradient-text">Activity</span>
        </h2>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>Fetching GitHub data...</span>
        </div>
      ) : (
        <>
          {/* Stats row */}
          <div
            className={`reveal ${inView ? "in-view" : ""} ${styles.statsRow}`}
          >
            {[
              { label: "Public Repos", value: stats?.public_repos ?? "40+" },
              { label: "Followers", value: stats?.followers ?? "—" },
              { label: "Following", value: stats?.following ?? "—" },
              {
                label: "GitHub Since",
                value: stats?.created_at
                  ? new Date(stats.created_at).getFullYear()
                  : "2022",
              },
            ].map(({ label, value }) => (
              <div key={label} className={styles.statBox}>
                <div className={styles.statVal}>{value}</div>
                <div className={styles.statLbl}>{label}</div>
              </div>
            ))}
          </div>

          {/* GitHub image stats */}
          <div className={`reveal ${inView ? "in-view" : ""} ${styles.imgRow}`}>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0f0f1e&title_color=8b5cf6&icon_color=22d3ee&text_color=e2e8f0`}
              alt="GitHub Stats"
              className={styles.statsImg}
              onError={(e) => (e.target.style.display = "none")}
            />
            <img
              src={`https://github-readme-streak-stats.herokuapp.com?user=${USERNAME}&theme=tokyonight&hide_border=true&background=0f0f1e&ring=8b5cf6&fire=22d3ee&currStreakLabel=8b5cf6`}
              alt="GitHub Streak"
              className={styles.statsImg}
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>

          {/* Top repos */}
          {repos.length > 0 && (
            <div
              className={`reveal ${inView ? "in-view" : ""} ${styles.repoGrid}`}
            >
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.repoCard}
                >
                  <div className={styles.repoName}>{repo.name}</div>
                  <div className={styles.repoDesc}>
                    {repo.description || "No description"}
                  </div>
                  <div className={styles.repoMeta}>
                    {repo.language && (
                      <span className={styles.repoLang}>
                        <span className={styles.langDot} />
                        {repo.language}
                      </span>
                    )}
                    <span className={styles.repoStar}>
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className={styles.repoFork}>
                      🍴 {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
