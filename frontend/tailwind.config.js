/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        heading: ['Outfit', 'sans-serif'],
                        body: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                },
                colors: {
                        navy: {
                                DEFAULT: '#1A365B',
                                50: '#F0F4F8',
                                100: '#D9E2EC',
                                200: '#BCCCDC',
                                300: '#9FB3C8',
                                400: '#6E8CAF',
                                500: '#486581',
                                600: '#334E68',
                                700: '#243B53',
                                800: '#1A365B',
                                900: '#102A43',
                        },
                        green: {
                                DEFAULT: '#70E252',
                                50: '#F0FDE8',
                                100: '#DCFACD',
                                200: '#B8F5A0',
                                300: '#93EF73',
                                400: '#70E252',
                                500: '#4FC830',
                                600: '#3DA024',
                                700: '#2B7818',
                                800: '#1A500C',
                                900: '#0F291E',
                        },
                        teal: '#2B4F79',
                        surface: '#F8FAFC',
                        'surface-highlight': '#F1F5F9',
                        'text-main': '#0F172A',
                        'text-muted': '#64748B',
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        },
                        'float': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-10px)' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'float': 'float 6s ease-in-out infinite',
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
