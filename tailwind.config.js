/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        primary: {
          DEFAULT: '#ff4757', 
          dark: '#ff6b81',
        },
        background: {
          DEFAULT: '#f8f9fa', 
          dark: '#1f2937', 
        },
        accent: {
          DEFAULT: '#e5e7eb', 
          dark: '#374151', 
        },
        muted: {
          foreground: '#6b7280', 
          darkForeground: '#9ca3af',
        },
      }
    },
  },
  plugins: [],
}

