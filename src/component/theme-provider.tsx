import React, { createContext, useContext } from 'react';

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  gray: '#AAAAAA',
  primary: '#5F2EEA',
  secondary: '#1CC8EE',
  success: '#00BA88',
  error: '#ED2E7E',
  warning: '#F4B740',
  primary100: '#BCA4FF',
};

export const DEFAULT = {
  colors,
};

export const ThemeContext = createContext(DEFAULT);
export const ThemeProvider: React.FC<any> = ({ children }) => {
  return (
    <ThemeContext.Provider value={DEFAULT}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
