import React, { useCallback, useEffect, useRef } from "react";
import { classNames } from "../../utils";
import { TabMenuButtonsProvider, useTabMenuButtonsContext } from "./tab-menu-buttons-provider";

interface IGroupButtonTabMenuProps {
  defaultSelectedValue: string; 
  onTabSelect: (value: string) => void;
  children: JSX.Element|JSX.Element[];
  ariaLabelledBy: string;
}

export const TabMenuButtons = ({children, defaultSelectedValue, onTabSelect, ...rest}: IGroupButtonTabMenuProps) => { 
  return (
    <TabMenuButtonsProvider onTabSelect={onTabSelect} defaultSelectedValue={defaultSelectedValue}>
      <TabMenuButtonsComponent {...rest} >
        {children}
      </TabMenuButtonsComponent>
    </TabMenuButtonsProvider>
  ) 
}

const TabMenuButtonsComponent = ({ariaLabelledBy, children}: Pick<IGroupButtonTabMenuProps, "ariaLabelledBy" | "children">) => {
  const { selectedTab, setSelectedTab, getRegisteredTabs } = useTabMenuButtonsContext();

  const setFirstTab = useCallback(() => {
    const registeredTabs = getRegisteredTabs();
    const keys = Object.keys(registeredTabs);
    const firstKey = keys[0];
    setSelectedTab(firstKey);
    registeredTabs[firstKey].ref.current?.focus();
  }, [getRegisteredTabs, setSelectedTab]);

  const setPreviousTab = useCallback(() => {
    const registeredTabs = getRegisteredTabs();
    const keys = Object.keys(registeredTabs);
    let prevKey: string;
    if (selectedTab) {
      const index = keys.indexOf(selectedTab as any);
      const prevIndex = index === 0 ? keys.length-1 : index - 1;
      prevKey = keys[prevIndex];
    } else {
      prevKey = keys[keys.length-1];
    }
    setSelectedTab(prevKey);
    registeredTabs[prevKey].ref.current?.focus();
  }, [getRegisteredTabs, selectedTab, setSelectedTab]);

  const setNextTab = useCallback(() => {
    const registeredTabs = getRegisteredTabs();
    const keys = Object.keys(registeredTabs);
    let nextKey: string;
    if (selectedTab) {
      const index = keys.indexOf(selectedTab as any);
      const nextIndex = index >= keys.length -1 ? 0 : index + 1;
      nextKey = keys[nextIndex];
    } else {
      nextKey = keys[0];
    }
    setSelectedTab(nextKey);
    registeredTabs[nextKey].ref.current?.focus();
  }, [getRegisteredTabs, selectedTab, setSelectedTab]);

  const setLastTab = useCallback(() => {
    const registeredTabs = getRegisteredTabs();
    const keys = Object.keys(registeredTabs);
    const lastKey = keys[keys.length-1];
    setSelectedTab(lastKey);
    registeredTabs[lastKey].ref.current?.focus();
  }, [getRegisteredTabs, setSelectedTab]);

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        setPreviousTab();
        event.preventDefault();
        break;
      case 'ArrowRight':
        setNextTab();
        event.preventDefault();
        break;
      case 'Home':
        setFirstTab();
        event.preventDefault();
        break;
      case 'End':
        setLastTab();
        event.preventDefault();
        break;
      default:
        break;
    }
  }, [setPreviousTab, setFirstTab, setNextTab, setLastTab])

  return ( 
    <div 
      className="flex space-x-1 rounded-lg bg-slate-200 dark:bg-zinc-700 p-0.5"
      role="tablist"
      aria-orientation="horizontal"
      aria-labelledby={ariaLabelledBy}
      onKeyDown={onKeyDown}
    >    
      {children}
    </div>
  );
}

interface IGroupButtonTabMenuItemProps {
  ariaControl: string;
  id: string;
  value: string;
  icon?: JSX.Element;
}

export const TabMenuButtonsItem = ({icon, id, value, ariaControl}: IGroupButtonTabMenuItemProps) => {
  const { selectedTab, setSelectedTab, onRegister, onUnregister } = useTabMenuButtonsContext();
  const isSelected = selectedTab === value;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = useCallback(() => {
    setSelectedTab(value);
  }, [setSelectedTab, value]);

  useEffect(() => {
    onRegister({ value, ref: buttonRef });

    return () => {
      onUnregister({ value, ref: buttonRef });
    };    
  }, [onRegister, onUnregister, value]);

  return (
    <button 
      className={classNames(
        "flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 lg:pr-3",
        isSelected ? "text-base font-semibold bg-white dark:bg-black shadow" : "text-sm hover:bg-slate-100 hover:dark:bg-zinc-800"
      )}
      id={id}
      role="tab" 
      ref={buttonRef}
      onClick={onClick}
      type="button" 
      aria-selected={isSelected ? true : false}
      tabIndex={isSelected ? 0 : -1}
      aria-controls={ariaControl}
    >
      {icon}
      <span className={classNames(
        "sr-only lg:not-sr-only lg:ml-2",
        isSelected ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-neutral-300"
      )}>
        {value}
      </span>
    </button>
  )
}
