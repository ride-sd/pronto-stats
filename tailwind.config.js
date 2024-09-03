/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            pronto: '#550087',
            accent: '#42f8ed',
            gold: '#f5df4d'
        },
        fontSize: {
            'base': '1.5rem',
            'lg': '2.1rem',
        }
    },
    plugins: [],
}