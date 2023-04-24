import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useAppTheme = () => useContext(ThemeContext);


export const ThemeProvider = ({ children }) => {
  const [themeType, setThemeType] = useState("dark");

  useEffect(() => {
    const storedThemeType = localStorage.getItem("themeType");
    if (storedThemeType) {
      setThemeType(storedThemeType);
    }
  }, []);

  const switchThemes = () => {
    setThemeType((last) => {
      const nextTheme = last === "dark" ? "light" : "dark";
      localStorage.setItem("themeType", nextTheme);
      return nextTheme;
    });
  };

  const value = { themeType, switchThemes };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
