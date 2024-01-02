import type { Config } from 'tailwindcss';

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
            },
            dropShadow: {
                card: '5px 5px 0px #1A1A23',
            },
        },
    },
    plugins: [],
};
export default config;
