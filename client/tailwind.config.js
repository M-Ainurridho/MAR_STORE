/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         backgroundImage: {
            "hero-pattern": "url('/src/assets/images/backgrounds/hero.jpg')",
         },
         height: {
            "screen-10": "10vh",
            "screen-13": "13vh",
            "screen-87": "87vh",
         },
         margin: {
            "screen-13": "13vh",
            "screen-10": "10vh",
         },
         spacing: {
            "screen-13": "13vh",
         },
         width: {
            "5%": "5%",
            "22%": "25%",
            "95%": "95%",
         },
      },
   },
   plugins: [],
};
