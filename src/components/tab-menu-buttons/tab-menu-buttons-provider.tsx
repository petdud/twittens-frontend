import React from 'react';

export type TabRegisterData = {
  /**
   * The value of the tab.
   */
  value: string;

  /**
   * The reference to the tab HTML element.
   */
  ref: React.RefObject<HTMLElement>;
};

export type RegisterTabEventHandler = (data: TabRegisterData) => void;

interface ITabMenuButtonsProviderProps {
  children: JSX.Element;
  defaultSelectedValue?: string;
  onTabSelect?: (value: string) => void;
}

type TabMenuButtonsType = {
  selectedTab: string | undefined;
  setSelectedTab: (value: string) => void;
  onRegister: RegisterTabEventHandler
  onUnregister: RegisterTabEventHandler;
  getRegisteredTabs: () => Record<string, TabRegisterData>;
};

const TabMenuButtonsContext = React.createContext({} as TabMenuButtonsType);
TabMenuButtonsContext.displayName = 'TabMenuButtonsProvider';

export const TabMenuButtonsProvider = ({ children, defaultSelectedValue, onTabSelect }: ITabMenuButtonsProviderProps) => {
  const [selectedTab, setSelectedTab] = React.useState<string | undefined>(defaultSelectedValue);
  const registeredTabs = React.useRef<Record<string, TabRegisterData>>({});

  const onChange = React.useCallback((value: string) => {
    onTabSelect?.(value);
    setSelectedTab(value);
  }, [onTabSelect]);

  const onRegister = (data: TabRegisterData) => registeredTabs.current[data.value] = data;

  const onUnregister = (data: TabRegisterData) => delete registeredTabs.current[data.value];

  const getRegisteredTabs = () => registeredTabs.current;

  React.useEffect(() => {
    if (defaultSelectedValue !== selectedTab) {
      setSelectedTab(defaultSelectedValue)
    }
  }, [defaultSelectedValue, onChange, selectedTab]);

  return (
    <TabMenuButtonsContext.Provider value={{
      getRegisteredTabs,
      selectedTab, 
      setSelectedTab: onChange,
      onRegister,
      onUnregister,
    }}>
      {children}
    </TabMenuButtonsContext.Provider>
  )
};

export function useTabMenuButtonsContext() {
  return React.useContext(TabMenuButtonsContext);
}
