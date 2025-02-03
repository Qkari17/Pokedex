import { createContext, useContext, useEffect, useRef } from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

type ThemeContextType = {
  theme: React.MutableRefObject<Theme | null>;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
ThemeContext.displayName = "ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context) {
    return context;
  }
  throw new Error("Component should be placed inside ThemeContextProvider");
};

const saveThemeToLocalStorage = (theme: Theme) => {
  localStorage.setItem("theme", theme);
};

const loadThemeFromLocalStorage = (): Theme | null => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === Theme.LIGHT || savedTheme === Theme.DARK) {
    return savedTheme as Theme;
  }
  return null;
};

export const getMode = () => {
  if (window.matchMedia) {
    const matchesLightMode = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    return matchesLightMode ? Theme.LIGHT : Theme.DARK;
  }
  return null;
};

const addDarkClass = () => document.body.classList.add("dark");
const removeDarkClass = () => document.body.classList.remove("dark");

const useTheme = () => {
  const theme = useRef<Theme | null>(loadThemeFromLocalStorage() || getMode());

  useEffect(() => {
    const themeMode = theme.current;
    if (themeMode === Theme.DARK) {
      addDarkClass();
    } else {
      removeDarkClass();
    }

    const handleSchemeChange = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? Theme.DARK : Theme.LIGHT;
      theme.current = newTheme;
      saveThemeToLocalStorage(newTheme);
      if (newTheme === Theme.DARK) {
        addDarkClass();
      } else {
        removeDarkClass();
      }
    };

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", handleSchemeChange);

    return () => {
      query.removeEventListener("change", handleSchemeChange);
    };
  }, []);

  const toggle = () => {
    if (theme.current === Theme.DARK) {
      theme.current = Theme.LIGHT;
      removeDarkClass();
    } else {
      theme.current = Theme.DARK;
      addDarkClass();
    }
    saveThemeToLocalStorage(theme.current);
  };

  return { theme, toggle };
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeContext.Provider value={useTheme()}>{children}</ThemeContext.Provider>
  );
};
