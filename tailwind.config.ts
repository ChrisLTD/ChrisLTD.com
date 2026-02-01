import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#d74824',
        'body-color': '#373133',
        offwhite: '#fbf8f3',
        blue: '#1C6588',
        gray: '#373133',
        'light-gray': '#9da4a8',
        'faint-gray': '#d6d6d6',
      },
      fontFamily: {
        sans: ['franklin-gothic-urw', 'ITC Franklin Gothic', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
        serif: ['adobe-caslon-pro', 'Adobe Caslon Pro', 'Georgia', 'Times New Roman', 'Times', 'serif'],
        mono: ['Consolas', 'inconsolata', 'Monaco', 'Courier New', 'Courier', 'monospace'],
      },
      maxWidth: {
        'container': '1000px',
      },
      lineHeight: {
        'relaxed': '1.5',
      },
    },
  },
  plugins: [],
};

export default config;
