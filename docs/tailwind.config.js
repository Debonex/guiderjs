/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        card: "var(--ifm-card-background-color)",
        content: "var(--ifm-color-content)",
      },
    },
  },
  plugins: [],
};
