import { useState } from "react";
import { useInView } from "../hooks";
import styles from "./Contact.module.css";

const ITEMS = [
  {
    icon: "✉",
    type: "Email",
    val: "skkarmasi421@gmail.com",
    href: "mailto:skkarmasi421@gmail.com",
  },
  {
    icon: "📞",
    type: "Phone",
    val: "+91 7261075889",
    href: "tel:+917261075889",
  },
  {
    icon: "⌥",
    type: "GitHub",
    val: "CODEWITH-JAIVY",
    href: "https://github.com/CODEWITH-JAIVY",
  },
  {
    icon: "in",
    type: "LinkedIn",
    val: "sanjeet-kumar",
    href: "https://www.linkedin.com/in/sanjeet-kumar-1a2b3c",
  },
];

const SOCIALS = [
  { icon: "⌥", href: "https://github.com/CODEWITH-JAIVY", label: "GitHub" },
  {
    icon: "in",
    href: "https://www.linkedin.com/in/sanjeet-kumar-1a2b3c",
    label: "LinkedIn",
  },
  {
    icon: "📸",
    href: "https://www.instagram.com/codewithjaivy",
    label: "Instagram",
  },
  { icon: "✉", href: "mailto:skkarmasi421@gmail.com", label: "Email" },
];

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — replace with your backend/EmailJS
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className={`section section--alt ${styles.contact}`}>
      <div ref={ref} className={`reveal ${inView ? "in-view" : ""}`}>
        <div className="section__label">05 — Contact</div>
        <h2 className="section__title">
          Let's Build
          <br />
          <span className="gradient-text">Something Together</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {/* Left */}
        <div className={`reveal delay-1 ${inView ? "in-view" : ""}`}>
          <p className={styles.intro}>
            I am currently open to full-time opportunities and freelance
            projects. Whether you have a question or just want to say hi — reach
            out!
          </p>

          <div className={styles.items}>
            {ITEMS.map((item) => (
              <a
                key={item.type}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={styles.item}
              >
                <div className={styles.itemIcon}>{item.icon}</div>
                <div>
                  <div className={styles.itemType}>{item.type}</div>
                  <div className={styles.itemVal}>{item.val}</div>
                </div>
                <span className={styles.itemArrow}>↗</span>
              </a>
            ))}
          </div>

          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={styles.social}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Contact Form */}
        <div className={`reveal delay-2 ${inView ? "in-view" : ""}`}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Send a Message</h3>

            {sent ? (
              <div className={styles.successMsg}>
                <span>✅</span>
                <p>Message sent! I will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label}>Your Name</label>
                  <input
                    type="text"
                    placeholder="sanjeet kumar"
                    className={styles.input}
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    placeholder="jaivy@example.com"
                    className={styles.input}
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    placeholder="Hi Sanjeet, I'd like to discuss..."
                    className={`${styles.input} ${styles.textarea}`}
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`btn-primary ${styles.submitBtn}`}
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message ✉"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
