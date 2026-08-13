/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f5f5f1', ink: '#171916', line: '#d9dcd6',
        cobalt: '#3157d5', cyan: '#16a6a1', ember: '#ef6a4c', moss: '#607768',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: { float: '0 22px 70px rgba(27, 32, 25, .10)' },
    },
  },
  plugins: [],
}
