import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { HistoryManagerProvider, useHistoryManager } from '../core/history-manager-provider';
import { ThemeProvider } from '../core/theme-provider';

export default function App({ Component, pageProps }: AppProps) {
  const historyManager = useHistoryManager();
  
  return (
    <ThemeProvider>
      <HistoryManagerProvider value={historyManager}>
        <Component {...pageProps} />
      </HistoryManagerProvider>
    </ThemeProvider>
  )
}
