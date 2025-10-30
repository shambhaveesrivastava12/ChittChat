import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("Current theme:", theme);
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full text-lg inline-flex items-center justify-center"
      aria-pressed={theme === "light"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  );
};

export default ThemeToggle;
