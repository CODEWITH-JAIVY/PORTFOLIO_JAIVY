# Sanjeet Kumar — Portfolio

A premium, production-grade React portfolio with dark theme, smooth animations, and responsive design.

## ✨ Features

- **Custom cursor** with trailing ring effect
- **Typing animation** in hero with multiple role titles
- **Animated counters** for stats
- **3D tilt card** in hero (mouse parallax)
- **Scroll reveal** animations on every section
- **Animated skill bars** with color-coded progress
- **Project slider** with auto-play & modal detail view
- **Responsive** for all screen sizes
- **CSS Modules** — zero class collisions

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # Root component
    ├── data/
    │   └── index.js        # Projects, Skills, Certs data
    ├── hooks/
    │   └── index.js        # useTyping, useCounter, useInView, useMouseTilt
    ├── styles/
    │   └── global.css      # CSS variables, animations, utilities
    └── components/
        ├── Cursor.jsx / .module.css    (not separate — styles in global)
        ├── Nav.jsx / Nav.module.css
        ├── Hero.jsx / Hero.module.css
        ├── About.jsx / About.module.css
        ├── Skills.jsx / Skills.module.css
        ├── Projects.jsx / Projects.module.css
        ├── Certificates.jsx / Certificates.module.css
        ├── Contact.jsx / Contact.module.css
        └── Footer.jsx / Footer.module.css
```

## 🎨 Customization

### Update your info
Edit `src/data/index.js` — all projects, skills, and certificates live here.

### Add your photo
In `src/components/About.jsx`, replace the placeholder `<div>` inside `.photoInner` with:
```jsx
<img src="/photo.jpg" alt="Sanjeet Kumar" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
```
Place `photo.jpg` in the `public/` folder.

### Add your resume
Place `resume.pdf` in the `public/` folder.
Then in `About.jsx` and `Contact.jsx`, replace the `alert(...)` calls with:
```js
window.open('/resume.pdf', '_blank')
```

### Color theme
All colors are CSS variables in `src/styles/global.css` under `:root {}`.
Change `--violet` and `--cyan` to theme the entire site instantly.

## 🌐 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

### GitHub Pages
Add `"base": "/your-repo-name/"` to `vite.config.js`, then:
```bash
npm run build
```
