/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '40px',
      screens: {
        DEFAULT: '1320px',
      },
    },
    extend: {
      colors: {
        navy: {
          900: 'var(--navy-900)',
          800: 'var(--navy-800)',
          700: 'var(--navy-700)',
          600: 'var(--navy-600)',
        },
        ink: {
          900: 'var(--ink-900)',
          800: 'var(--ink-800)',
          500: 'var(--ink-500)',
          300: 'var(--ink-300)',
          200: 'var(--ink-200)',
          100: 'var(--ink-100)',
          50:  'var(--ink-50)',
        },
        accent: 'var(--accent)',
        whatsapp: 'var(--whatsapp)',
        paper: 'var(--paper)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
