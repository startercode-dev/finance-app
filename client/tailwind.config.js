/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                '38/61': '38.2% 61.8%',
                16: 'repeat(16, minmax(0, 1fr))',
            },

            gridTemplateRows: {
                col1: '25% 35% 40%',
                col2: '70.3% 29.7%',
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-mono)'],
            },
            colors: {
                primary: '#5A7C59',
                secondary: '#855E95',
                dark: '#1E0A24',
                white: '#fafafa',
            },
        },
    },
    plugins: [],
};
