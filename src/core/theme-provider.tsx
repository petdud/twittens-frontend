import React, { useEffect, useState } from 'react';

interface IThemeProviderProps {
  children: JSX.Element;
}

type ThemeType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const updateDocumentClass = (theme: string) => {
  theme === "dark" ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
}

const ThemeContext = React.createContext({} as ThemeType);
ThemeContext.displayName = 'ThemeContext';

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [theme, setTheme] = useState<string>("light");
  
  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.theme = theme;
    updateDocumentClass(theme);
  };

  useEffect(() => {
    const isDarkTheme = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const theme = isDarkTheme ? "dark" : "light";
    setTheme(theme);
    updateDocumentClass(theme);
  }, [])

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
