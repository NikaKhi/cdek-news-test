/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cdek: {
          primary: '#1E7B48',
          dark: '#0D3B21',
          light: '#E8F5EE',
          gray: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      maxWidth: {
        'news-desktop': '589px',
        'news-mobile': '347px',
      }
    },
  },
  plugins: [],
}