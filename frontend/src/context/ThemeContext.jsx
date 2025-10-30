// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

/**
 * ThemeProvider
 * - Reads/writes localStorage key "theme" (values: "dark" | "light")
 * - Adds `dark` class on <html> when theme === 'dark' (keeps your existing behavior)
 * - Adds `light-mode` class on <body> when theme === 'light' (so Home.css can listen)
 * - Safe for environments without `document` (SSR).
 */
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
