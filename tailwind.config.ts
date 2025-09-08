import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
       fontFamily: {
        futura: ["var(--font-futura-heavy-oblique)", "sans-serif"],
        gestura: ["var(--font-gestura)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
