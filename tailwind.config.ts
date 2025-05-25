import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      theme: {
        container: {
          center: true,
          padding: '1rem',
          screens: {
            '2xl': '1400px',
          },
        },
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        //  Figma design colors
        neutralGray: '#808080',
        primary1: {
          DEFAULT: '#228EE5',
          tint: {
            '1': '#3C9BE8',
            '2': '#55A7EB',
            '3': '#6DB4EE',
            '4': '#85C0F1',
            '5': '#9ECDF4',
            '6': '#B6D9F6',
            '7': '#CEE6F9',
            '8': '#E7F2FC',
          },
          shade: {
            '1': '#187DD0',
            '2': '#156BB2',
            '3': '#115994',
            '4': '#0E4877',
            '5': '#0E4877',
            '6': '#07243B',
            '7': '#03121E',
            '8': '#000000',
          },
        },
        primary2: {
          DEFAULT: '#EBFAFF',
          tone: {
            '1': '#E1EFF3',
            '2': '#D8E4E8',
            '3': '#CED9DC',
            '4': '#C4CED1',
            '5': '#BAC3C5',
            '6': '#B1B7BA',
            '7': '#A7ACAE',
            '8': '#9DA1A3',
          },
          shade: {
            '1': '#BEEFFF',
            '2': '#BEEFFF',
            '3': '#65D9FF',
            '4': '#39CDFF',
            '5': '#0CC2FF',
            '6': '#00A7DF',
            '7': '#0086B2',
            '8': '#006486',
          },
        },
        secondary1: {
          DEFAULT: '#E5228D',
          tint: {
            '1': '#E93F9C',
            '2': '#EC5BAA',
            '3': '#EF76B9',
            '4': '#F291C7',
            '5': '#F5ADD5',
            '6': '#F9C8E3',
            '7': '#F9C8E3',
            '8': '#FFFFFF',
          },
          shade: {
            '1': '#D0187D',
            '2': '#B2156B',
            '3': '#941159',
            '4': '#770E48',
            '5': '#590A36',
            '6': '#3B0724',
            '7': '#1E0312',
            '8': '#000000',
          },
        },
        bgTint: {
          DEFAULT: '#030A1B',
          '1': '#091E51',
          '2': '#0F3187',
          '3': 'rgba(21, 69, 189, 72.55)',
          '4': 'rgba(39, 94, 231, 78.04)',
          '5': '#275EE7',
          '6': '#5D86ED',
          '7': '#93AEF3',
          '8': '#FFFFFF',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'stroke-gradient':
          'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 56%, rgba(255,255,255,0.66) 100%)',
        'card-gradient': 'linear-gradient(90deg, #00CFFF 0%, #010101 100%)',
        'dark-gradient':
          'linear-gradient(90deg, rgba(3,10,27,1) 0%,  rgba(3,10,27,0.95) 8%, rgba(3,10,27,0.06) 100%)',
        'light-gradient':
          'linear-gradient(90deg, rgba(235, 250, 255, 1) 0%, rgba(231,246,252,1) 5%,  rgba(231, 246, 252, 0.06) 52%)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config
