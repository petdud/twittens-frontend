import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { HistoryManagerProvider, useHistoryManager } from '../core/history-manager-provider';
import { ThemeProvider } from '../core/theme-provider';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const historyManager = useHistoryManager();
  
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <HistoryManagerProvider value={historyManager}>
          <Component {...pageProps} />
        </HistoryManagerProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
