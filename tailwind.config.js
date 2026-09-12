/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#151A23',
          700: '#2B3342',
          500: '#5B6472',
          300: '#9AA3B1',
          100: '#E7EAEF',
        },
        canvas: '#F4F5F7',
        surface: '#FFFFFF',
        brand: {
          DEFAULT: '#2F5D62',
          dark: '#20423F',
          light: '#DCE9E7',
        },
        accent: {
          amber: '#B8722C',
          rose: '#B23A48',
          moss: '#3E7048',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 0 0 1px rgba(21,26,35,0.06), 0 12px 24px -8px rgba(21,26,35,0.18)',
      },
    },
  },
  plugins: [],
}
