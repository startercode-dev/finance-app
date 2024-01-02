import store from '@/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { Red_Hat_Display } from 'next/font/google';

const sans = Red_Hat_Display({ subsets: ['latin'], variable: '--font-sans' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${sans.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
