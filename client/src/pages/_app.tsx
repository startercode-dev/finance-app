import store from '@/store';
import '@/styles/styles.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Red_Hat_Mono } from 'next/font/google';

const mono = Red_Hat_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <main className={mono.className}>
                <Component {...pageProps} />
            </main>
        </Provider>
    );
}
