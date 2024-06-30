import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
      },
      animation: {
        float: 'float 2s ease-in-out infinite',
      },
    },
  },
  plugins: [nextui({
    themes: {
      light: {
        // ...
        colors: {
          addCommonColors: true,
          gold: '#ff33dd',
        },
      },
      dark: {
        // ...
        colors: {},
      },
      // ... custom themes
    },
  }),],
  darkMode: "class",
}
export default config
