/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d74824',
        'primary-dark': '#b83d1f',
        gray: {
          light: '#f5f5f5',
          medium: '#999',
          dark: '#333',
        }
      },
      fontFamily: {
        sans: ['Franklin Gothic URW', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Adobe Caslon Pro', 'Georgia', 'serif'],
        mono: ['Monaco', 'Menlo', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.dark'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary-dark'),
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [],
}
