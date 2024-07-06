import { useEffect, useState } from "react";
import { Session } from "../utils/storage";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("dark");
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = (mode: string) => {
    Session.set("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    const localTheme = Session.get("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode("light");
    }
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};
