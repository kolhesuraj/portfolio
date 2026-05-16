// App.jsx
// Final single-file React portfolio starter (Tailwind CSS + react-icons + framer-motion)
// Includes: theme toggle, parallax hero, floating shapes, tilt project cards, skill logos, animated cursor.
// How to use:
// 1. Create a React app (Vite recommended):
//    npm create vite@latest my-portfolio --template react
//    cd my-portfolio
// 2. Install dependencies:
//    npm install react-icons framer-motion
// 3. Install and configure Tailwind CSS (https://tailwindcss.com/docs/guides/vite)
// 4. Replace src/App.jsx with this file, ensure src/main.jsx imports './index.css'.
// 5. Start dev server: npm run dev

import AppProvider from "@/providers";
import AppRouter from "@/routes";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
