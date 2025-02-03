import { MouseEventHandler, useEffect, useState } from "react";
import { getMode, Theme, useThemeContext } from "./ThemeContext";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme | null>(getMode());

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === Theme.DARK) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    } else {
      const systemTheme = getMode();
      setTheme(systemTheme);
    }
  }, []);

  const context = useThemeContext();
  const handleClick: MouseEventHandler = () => {
    context.toggle();
    setTheme((theme) => (theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };
  const icon =
    theme === Theme.DARK ? (
      <button
        onClick={handleClick}
        className="cursor-pointer w-10 border-2 rounded-full bg-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
       className="fill-orange-400 hover:fill-orange-300 ease-in-out duration-400"
          viewBox="0 -960 960 960"
        >
          <path d="M440-760v-160h80v160zm266 110-55-55 112-115 56 57zm54 210v-80h160v80zM440-40v-160h80v160zM254-652 140-763l57-56 113 113zm508 512L651-255l54-54 114 110zM40-440v-80h160v80zm157 300-56-57 112-112 29 27 29 28zm283-100q-100 0-170-70t-70-170 70-170 170-70 170 70 70 170-70 170-170 70m0-80q66 0 113-47t47-113-47-113-113-47-113 47-47 113 47 113 113 47m0-160" />
        </svg>
      </button>
    ) : (
      <button
        onClick={handleClick}
        className="cursor-pointer w-10 border-2 rounded-full bg-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-purple-500 hover:fill-purple-600 ease-in-out duration-400"
          viewBox="0 0 24 24"
          
          
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    );
  return <div>{icon}</div>;
};
