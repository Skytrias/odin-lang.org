/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './themes/**/*.html',
    './layouts/**/*.html',
    './content/**/*.{md,html}',
  ],
  // Dark mode is handled via CSS custom properties + body.dark-mode class;
  // we don't use Tailwind's dark: prefix.
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      colors: {
        odin: {
          blue:    '#2563eb',
          'blue-light': '#60a5fa',
          orange:  '#ea580c',
          'orange-light': '#fb923c',
          navy:    '#070e1b',
        },
      },
    },
  },
  plugins: [],
}
