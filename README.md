# e-resume

A personal resume/portfolio website — built to present my background, skills, and projects in a single, interactive page.

**Live site:** [nikhil-e-resume.vercel.app](https://nikhil-e-resume.vercel.app)

## Overview

This is a single-page portfolio with a tabbed layout switching between an **Information** view (skills, tools, hackathon experience, education) and a **Projects** view (a grid of project cards), plus scroll-triggered reveal animations on the profile section.

## Features

- **Tabbed navigation** — smooth crossfade/slide transition between the Information and Projects sections, driven by vanilla JS (no framework)
- **Scroll reveal animations** — profile section elements animate in on scroll using [ScrollReveal.js](https://scrollrevealjs.org/)
- **Responsive layout** — single-column on mobile, two-column grid layout on larger screens (1150px+)
- **Project cards** — each card includes a screenshot, description, tech-stack tags, and a link to the live project

## Tech stack

- HTML5
- CSS3 (custom properties, CSS Grid, media queries)
- Vanilla JavaScript
- [ScrollReveal.js](https://scrollrevealjs.org/) — scroll animations
- [Remix Icon](https://remixicon.com/) — icon set
- Deployed on [Vercel](https://vercel.com/)

## Project structure

```
e-resume/
├── css/
│   └── styles.css
├── img/
│   └── ...
├── js/
│   └── main.js
└── index.html
```

## Featured projects

| Project | Description | Stack |
|---|---|---|
| [DataForge](https://dataforge-two-azure.vercel.app) | Editorial-style registration site for a 48-hour national hackathon hosted by the Data Science Club, VIT Bhopal | React, Vercel |
| [VCollab](https://vcollab-vitbhopal.vercel.app/login) | Student network built exclusively for VIT Bhopal — find project partners, join communities, discover events | React, Node.js |
| [Hand Cricket](https://hand-cricket-uf28.onrender.com) | Real-time multiplayer Hand Cricket game with live score updates and spoken commentary | Node.js, Socket.IO |
| [Ghost Protocol](https://ghost-protocol-two.vercel.app/) | Real-time anonymous chat application with self-destructing messages and live reactions | React, Socket.IO |

## Running locally

This is a static site with no build step.

```bash
git clone https://github.com/heynikcse/e-resume.git
cd e-resume
```

Then just open `index.html` in your browser, or serve it with any static server, e.g.:

```bash
npx serve .
```

## Contact

- Email: [nikhilraj3103@gmail.com](mailto:nikhilraj3103@gmail.com)
- LinkedIn: [linkedin.com/in/nikhil-raj](https://www.linkedin.com/in/nikhil-raj-3204b3362/)
- GitHub: [github.com/heynikcse](https://github.com/heynikcse)