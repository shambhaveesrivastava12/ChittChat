import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement; // <html>
    const body = document.body;

    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.remove("light-mode");
    } else {
      root.classList.remove("dark");
      body.classList.add("light-mode");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
