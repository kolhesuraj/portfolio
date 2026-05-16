# Suraj Kolhe — Portfolio

A modern, futuristic developer portfolio built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v3** — styling with dark mode support
- **Framer Motion** — scroll and entry animations
- **react-icons** — skill & social icons
- **lucide-react** — UI icons

## Features

- Dark / Light mode toggle (persisted in localStorage)
- Typewriter role animation
- Animated cyber grid background (dark) + diagonal pattern (light)
- Floating color orbs with blur
- 3D tilt effect on project cards
- Scroll-triggered animations via `whileInView`
- Colorful brand-matched skill pills
- Colorful tech tags on project cards
- Timeline layout for experience
- Downloadable CV (`/cv.html`)
- Fully responsive

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Customization

All personal data (name, bio, skills, projects, experience, education, contact) is in:

```text
src/pages/portfolio/utils/constants.ts
```

CV is at:

```text
public/cv.html
```
