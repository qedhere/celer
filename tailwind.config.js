/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#EAEAEA",
          300: "#999999",
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#111111",
          900: "#000000",
        },
        success: {
          100: "#d3e5ff",
          200: "#3291ff",
          300: "#0070f3",
          400: "#0761d1",
        },
        error: {
          100: "#f7d4d6",
          200: "#ff1a1a",
          300: "#e00e00",
          400: "#c50000",
        },
        warning: {
          100: "#ffefcf",
          200: "#f7b955",
          300: "#f5a623",
          400: "#ab570a",
        },
        cyan: {
          100: "#aaffec",
          200: "#79ffe1",
          300: "#50e3c2",
          400: "#29bc9b",
        },
        violet: {
          100: "#e3d7fc",
          200: "#8a63d2",
          300: "#7928ca",
          400: "#4c2889",
        },
        highlight: {
          100: "#ff0080",
          200: "#f81ce5",
          300: "#eb367f",
        },
      },
      typography: ({ theme }) => ({
        black: {
          css: {
            "--tw-prose-body": theme("colors.black[800]"),
            "--tw-prose-headings": theme("colors.black[900]"),
            "--tw-prose-lead": theme("colors.black[700]"),
            "--tw-prose-links": theme("colors.success[300]"),
            "--tw-prose-bold": theme("colors.black[900]"),
            "--tw-prose-counters": theme("colors.black[600]"),
            "--tw-prose-bullets": theme("colors.black[50]"),
            "--tw-prose-hr": theme("colors.black[200]"),
            "--tw-prose-quotes": theme("colors.black[300]"),
            "--tw-prose-quote-borders": theme("colors.black[200]"),
            "--tw-prose-captions": theme("colors.black[700]"),
            "--tw-prose-code": theme("colors.highlight[200]"),
            "--tw-prose-pre-code": theme("colors.black[100]"),
            "--tw-prose-pre-bg": theme("colors.black[800]"),
            "--tw-prose-th-borders": theme("colors.black[200]"),
            "--tw-prose-td-borders": theme("colors.black[200]"),
          },
        },
      }),
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
