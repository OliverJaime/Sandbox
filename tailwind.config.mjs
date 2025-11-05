/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,astro,tsx}',
    './components/**/*.{ts,astro,tsx}',
    './app/**/*.{ts,astro,tsx}',
    './src/**/*.{ts,astro,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem',
      },
    },
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
    },
    extend: {
      screens: {
        '2xl': '1400px',
      },
      fontSize: {
        'ss': '0.625rem'
      },
      minHeight: {
        'mastheadmobile': '44rem',
        // 'mastheadmobile': '40rem',
      },
      backgroundImage: {
        // 'mastheadbg': "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('/img/masthead-bg.png')",
        'mastheadbg': "url('/img/mastheadGradient2-bg.png')",
        // 'mastheadbg-mobile': "url('/img/mastheadMobile-bg.png')", (Not used)
        'mastheadbg-mobile': "linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0)), url('/img/mastheadMobile-bg.png')",
      },
      backgroundPosition: {
        'custom-mobile-focus': 'center 10%', // Adjust the percentage as needed
      },
      backgroundSize: {
        'desktop-custom': 'cover', // Full coverage for desktop
        'mobile-custom': '100%',
      },
      boxShadow: {
        'teamcard': '6px 5px 5px rgba(32, 65, 175, 0.12)',
        'innertop': 'inset 0 7px 9px -7px rgba(0,0,0,0.1)',
      },
      colors: {
        brand: {
          // RPT
          primary: '#7567A3',
          secondary: '#E9E9E9',
          dark: '#7567A3',
          text: '#1B1F29',

          // TPT
          primary_tpt: '#A2AC87',
          secondary_tpt: '#FDF6EB',
          dark_tpt: '#565B4A',
          text_tpt: '#1B1F29',
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      rotate: {
        '270': '270deg',
        '360': '360deg',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}