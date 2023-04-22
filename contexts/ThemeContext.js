// contexts/ThemeContext.js
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [themeType, setThemeType] = useState("light");
  const switchThemes = () => {
    setThemeType((last) => (last === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ themeType, switchThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}
