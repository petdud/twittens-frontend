import { useRouter } from 'next/router';
import { useContext, createContext, useEffect, useState } from 'react';

interface IHistoryManagerProviderProps {
	value: HistoryManager;
	children: JSX.Element
}

type HistoryManager = {
	history: string[]; 
	canGoBack: () => boolean;
}

const historyManagerContext = createContext<ReturnType<typeof useHistoryManager>>({} as HistoryManager);

export function HistoryManagerProvider({ value, children }: IHistoryManagerProviderProps) {
	return <historyManagerContext.Provider value={value}>{children}</historyManagerContext.Provider>;
}

export const useHistory = () => useContext(historyManagerContext);

export function useHistoryManager() {
	const router = useRouter();
	const [history, setHistory] = useState<string[]>([]);

	useEffect(() => {
		const handleRouteChange = (url: string, { shallow }: any) => {
			if (!shallow) {
				setHistory(prevState => [...prevState, url]);
			}
		};

		router.beforePopState(() => {
			setHistory(prevState => prevState.slice(0, -2));
			return true;
		});

		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [router]);

	return { history, canGoBack: () => history.length > 1 };
}