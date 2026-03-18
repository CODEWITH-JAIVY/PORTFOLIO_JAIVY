import { useEffect } from "react";
import "./styles/global.css";
import { ThemeProvider } from "./ThemeContext";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Roadmap from "./components/Roadmap";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GitHubStats from "./components/Githubstats.jsx";
export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <GitHubStats />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
