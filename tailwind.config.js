/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from original SCSS
        primary: {
          DEFAULT: '#d74824',
          dark: '#b83c1e',
        },
        secondary: '#1C6588',
        body: '#373133',
        'off-white': '#fbf8f3',
        gray: {
          light: '#e0e0e0',
          medium: '#999999',
          dark: '#666666',
        },
        // Tech colors for icons
        html5: '#df4e28',
        typescript: '#3178c6',
        react: '#292929',
        nextjs: '#171717',
        tailwind: '#00a6f4',
        git: '#e95235',
        rails: '#5c0102',
        wordpress: '#464646',
        figma: '#A990C8',
        docker: '#2497ED',
        swift: '#F05138',
        aws: '#F89A1D',
      },
      fontFamily: {
        sans: ['Franklin Gothic URW', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Adobe Caslon Pro', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['Consolas', 'Inconsolata', 'Monaco', 'monospace'],
      },
      maxWidth: {
        'site': '1000px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.body'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.dark'),
              },
            },
            h1: {
              color: theme('colors.body'),
            },
            h2: {
              color: theme('colors.body'),
            },
            h3: {
              color: theme('colors.body'),
            },
            code: {
              backgroundColor: theme('colors.gray.light'),
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
