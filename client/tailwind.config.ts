import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                title: ['var(--font-title)'],
            },
            colors: {
                background: '#E5E5DC',
                black: '#1A1A23',
                white: '#F2F2E9',
                primary: '#96CA7D',
                'primary-dark': '#78a264',
                'light-primary': '#C4ECB1',
                'gradient-blue': '#87bbd884',
                'gradient-purple': '#AC99D49a',
                'gradient-green': '#AAD59A9A',
                red: '#b64343',
            },
            dropShadow: {
                card: '6px 6px 0px #1A1A23',
            },
            animation: {
                scroll: 'scroll 30s linear infinite',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(calc(-100% - 1rem))' },
                },
            },
            screens: {
                tall: { raw: '(min-height: 1000px)' },
                mobile: { max: '767px' },
            },
        },
    },
    plugins: [],
};
export default config;
