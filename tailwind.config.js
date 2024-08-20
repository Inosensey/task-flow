/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      phone: '280px',
      mdphone: '420px',
      tablet: '481px',
      laptop: '992px',
      desktop: '1280px',
      larger: '1920px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        Primary: '#222831',
        Secondary: '#393E46',
        SmoothSecondary: '#2e3238',
        LightPrimary: '#00ADB5',
        LightPrimaryDisabled: '#006166',
        LightSecondary: '#EEEEEE',
        Disabled: '#b3b3b3',
        TextDisabled: '#cccccc',
        SmoothDark: '#1a1a1a',
        Success: '#248f24',
        Error: '#ff4d4d',
        SmoothError: '#ffcccc',

        // TodoList PrIorities
        Urgent: "#ff6666",
        HighPriority: "#FFA500",
        MediumPriority: "#b3b300",
        LowPriority: "#009900"

      },
      fontFamily: {
        Roboto: ['var(--font-roboto)'],
        PlayFairDisplay: ['var(--font-playfair-display)'],
        Poppins: ['var(--font-poppins)']
      }
    }
  },
  plugins: []
}
