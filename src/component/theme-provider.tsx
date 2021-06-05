import React, { createContext, useContext } from 'react';

export const colors = {
  white: '#FFFFFF',
  offwhite: '#E5E5E5',
  fawhite: '#FAFAFA',
  black: '#000000',
  black100: '#303030',
  gray: '#AAAAAA',
  lightgray: '#E8E8E8',
  darkgray: '#52575C',
  accentNest: '#00DCF0',
  caution200: '#FCF0CD',
  caution300: '#FEEA8A',
  caution400: '#EDC200',
  caution500: '#9C6F19',
  caution600: '#F5BD41',
  destructive200: '#FBEAE5',
  destructive300: '#FEAE9A',
  destructive400: '#DF3617',
  destructive500: '#BF0A12',
  primary: '#074EE8',
  primary100: '#F7FBFF',
  primary200: '#E6EBF2',
  primary300: '#CFD7E5',
  primary400: '#8F9CB2',
  primary500: '#172B4D',
  success200: '#E3F1DE',
  success300: '#BAE5B3',
  success400: '#4FB83D',
  success500: '#0F8043',
  gray12: '#121212',
};

export const DEFAULT = {
  baseSpace: 4,
  colors,
};

export const ThemeContext = createContext(DEFAULT);
export const ThemeProvider: React.FC<any> = ({ children }) => {
  return (
    <ThemeContext.Provider value={DEFAULT}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
