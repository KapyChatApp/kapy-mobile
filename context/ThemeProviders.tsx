import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'nativewind';

const ThemeContext = createContext({
  theme: 'light', 
  toggleTheme: () => {}, 
  isDarkTheme: false
});

export const ThemeProvider = ({ children }: any) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === 'dark');
  useEffect(() => {
    setColorScheme(isDarkTheme? 'dark':'light');
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    console.log(`Current system theme: ${colorScheme}`);
  };

  const theme = isDarkTheme ? 'dark' : 'light';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);