/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      //change primary color
      colors: {
        primary: '#262626',    //Text color
        secondary: '#425bff',  //Button color
        tertiary: '#fccec7',   //Border color
        quaternary: '#ffe7ba', 
        background: '#f7efe6', //Background color
        ok: '#10B981',         //Green
        warning: '#ffc773',    //Yellow
        error: '#EF4444',      //Red
      },
    },
  },
  plugins: [],
}

