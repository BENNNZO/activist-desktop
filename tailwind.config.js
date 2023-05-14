/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "var1": "var(--1)",
        "var2": "var(--2)",
        "var3": "var(--3)",
        "var4": "var(--4)",
        // "grey": {
        //   "100": "#1a1a1a",
        //   "200": "#333333",
        //   "300": "#4d4d4d",
        //   "400": "#666666",
        //   "500": "#808080",
        //   "600": "#999999",
        //   "700": "#b3b3b3",
        //   "800": "#cccccc",
        //   "900": "#e6e6e6"
        // }
      },
      height: {
        "10p": "10%",
        "20p": "20%",
        "30p": "30%",
        "40p": "40%",
        "50p": "50%",
        "60p": "60%",
        "70p": "70%",
        "80p": "80%",
        "90p": "90%",
        "100p": "100%"
      }
    },
  },
  plugins: [],
}
