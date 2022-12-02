import React, { useState } from 'react';

interface IThemeProviderProps {
  children: JSX.Element;
}

type ThemeType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = React.createContext({} as ThemeType);
ThemeContext.displayName = 'ThemeContext';

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const defaultDark = typeof window !== 'undefined'  && (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));
  const [theme, setTheme] = useState<string>(defaultDark ? "dark" : "light");

  if (typeof window !== 'undefined') {
    if (defaultDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  const changeTheme = React.useCallback((theme: string) => {
    setTheme(theme);
    if (theme === "light") {
      localStorage.theme = 'light'
    } else {
      localStorage.theme = 'dark'
    }
  }, []);


  return (
    <ThemeContext.Provider value={{
      theme, 
      setTheme: changeTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
};

export function useThemeContext() {
  return React.useContext(ThemeContext);
}
