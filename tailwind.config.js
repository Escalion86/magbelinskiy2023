/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter-tight': ['Inter Tight'],
        buyan: ['Buyan'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        button:
          '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset, 0px 25px 36px 0px rgba(255, 255, 255, 0.20) inset',
      },
      colors: {
        button: 'linear-gradient(63deg, #692DC1 0%, #AC80EC 100%)',
        'button-hover':
          'linear-gradient(45deg, #692DC1 0%, #AC80EC 47.23%, #A676EC 100%)',
        'button-push':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), linear-gradient(45deg, #692DC1 0%, #AC80EC 47.23%, #A676EC 100%)',
      },
      backgroundSize: {
        'size-200': '200% 200%',
        'size-300': '300% 300%',
      },
      backgroundPosition: {
        'pos-0': '2% 2%',
        'pos-50': '2% 98%',
        'pos-100': '98% 98%',
      },
      // width: {
      //   0: '0px',
      // },
    },
    screens: {
      mobile: '375px',
      xs: '375px',
      // => @media (min-width: 640px) { ... }

      phoneH: '420px',

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      tablet: '1024px',
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      desktop: '1920px',
      '3xl': '1920px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
}
