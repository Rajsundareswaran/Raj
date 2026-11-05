/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B14',
          900: '#09101D',
          850: '#0D1627',
          800: '#111C30',
          750: '#16233B',
          700: '#1D2D49',
        },
        civic: {
          blue: '#2563EB',
          blueHover: '#1D4ED8',
          cyan: '#38BDF8',
          teal: '#22D3EE',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'civic-card': '0 12px 36px -10px rgba(0, 0, 0, 0.55)',
        'civic-glow': '0 0 28px -6px rgba(37, 99, 235, 0.45)',
        'cyan-glow': '0 0 24px -6px rgba(56, 189, 248, 0.35)',
      },
    },
  },
  plugins: [],
};
