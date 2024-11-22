/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: ['hidden'],
      colors: {
        primary: 'var(--primary-color)',
        bg: 'var(--bg-color)',
        header: 'var(--primary-header)',
        hover: 'var(--hover-color)',
        button: 'var(--button-color)',
        'header-font': 'var(--header-font-color)',
        'hover-font': 'var(--hover-font-color)',
        'primary-font': 'var(--primary-font-color)',
        'primary-icon': 'var(--primary-icon-color)',
        'card-header': 'var(--card-header)',
      },
    },
  },
  plugins: [],
}

