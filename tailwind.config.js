import plugin from "tailwindcss/plugin";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        email: {
          bg: { light: "#fff", dark: "#1e1e1e" },
          text: { light: "#1f2937", dark: "#cccccc" },
          border: { light: "#d1d5db", dark: "#3e3e42" },
          sidebar: { light: "#f3f3f3", dark: "#252526" },
          active: { light: "#dbeafe", dark: "#094771" },
          input: { light: "#ffffff", dark: "#3c3c3c" },
          suggestion: { light: "#ffffff", dark: "#252526" },
          hover: { light: "#e5e7eb", dark: "#2a2d2e" },
        },
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addUtilities }) => {
      addUtilities({
        /* base */
        ".email-bg": { backgroundColor: "theme(colors.email.bg.light)" },
        ".dark .email-bg": { backgroundColor: "theme(colors.email.bg.dark)" },

        ".email-text": { color: "theme(colors.email.text.light)" },
        ".dark .email-text": { color: "theme(colors.email.text.dark)" },

        ".email-border": { borderColor: "theme(colors.email.border.light)" },
        ".dark .email-border": {
          borderColor: "theme(colors.email.border.dark)",
        },

        /* editor */
        ".email-editor": {
          backgroundColor: "theme(colors.email.bg.light)",
          color: "theme(colors.email.text.light)",
        },
        ".dark .email-editor": {
          backgroundColor: "theme(colors.email.bg.dark)",
          color: "theme(colors.email.text.dark)",
        },

        /* input */
        ".email-input": {
          backgroundColor: "theme(colors.email.input.light)",
          color: "theme(colors.email.text.light)",
          borderColor: "theme(colors.email.border.light)",
        },
        ".dark .email-input": {
          backgroundColor: "theme(colors.email.input.dark)",
          color: "theme(colors.email.text.dark)",
          borderColor: "theme(colors.email.border.dark)",
        },

        /* hover */
        ".email-hover:hover": {
          backgroundColor: "theme(colors.email.hover.light)",
        },
        ".dark .email-hover:hover": {
          backgroundColor: "theme(colors.email.hover.dark)",
        },

        /* suggestion */
        ".email-suggestion": {
          backgroundColor: "theme(colors.email.suggestion.light)",
          borderColor: "theme(colors.email.border.light)",
        },
        ".dark .email-suggestion": {
          backgroundColor: "theme(colors.email.suggestion.dark)",
          borderColor: "#454545",
        },
      });
    }),
  ],
};
