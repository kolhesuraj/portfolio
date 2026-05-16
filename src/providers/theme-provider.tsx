import { hexToHsl } from "@/lib/utils";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface UserTheme {
  background?: string;
  foreground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  ternary?: string;
  ternaryForeground?: string;
  accent?: string;
  accentForeground?: string;
  [key: string]: string | undefined;
}

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme: UserTheme | null;
  userTheme: UserTheme | null;
  storageKey?: string;
  logos?: {
    logo?: string;
    horizontalLogo?: string;
    icon?: string;
  };
  themeReady?: boolean;
};

type ThemeProviderState = {
  userTheme: UserTheme | null;
  setUserTheme: (theme: Partial<UserTheme>) => void;
  userLogos?: {
    logo?: string;
    horizontalLogo?: string;
    icon?: string;
  };
  themeReady?: boolean;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

export default function ThemeProvider({
  children,
  defaultTheme,
  userTheme,
  logos,
  themeReady,
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<UserTheme>(
    userTheme || defaultTheme || {},
  );

  // Merge user theme with default theme
  const mergedTheme = useMemo(
    () => ({ ...defaultTheme, ...(userTheme || currentTheme) }),
    [defaultTheme, userTheme, currentTheme],
  );

  useEffect(() => {
    if (currentTheme) {
      // Apply the merged theme to :root as CSS variables
      const root = document.documentElement;
      Object.entries(mergedTheme).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        const dashedKey = key.replace(
          /[A-Z]/g,
          (match) => `-${match.toLowerCase()}`,
        );
        if (dashedKey === "font") {
          const fontLink = document.createElement("link");
          fontLink.rel = "stylesheet";
          fontLink.href = `https://fonts.googleapis.com/css2?family=${value.replace(/\s+/g, "+")}:wght@100;300;400;500;700;900&display=swap`;

          document.head.appendChild(fontLink);

          root.style.setProperty("--font", `'${value}', sans-serif`);
          return;
        }
        root.style.setProperty(`--${dashedKey}`, hexToHsl(value));
        if (dashedKey === "primary") {
          const primaryDark = hexToHsl(value).split(" ");
          const l = Number(primaryDark[2].replace("%", "")) - 10;
          primaryDark[2] = (l < 0 ? 0 : l) + "%";
          root.style.setProperty("--primary-dark", primaryDark.join(" "));
        }
        if (dashedKey === "secondary") {
          const secondary = hexToHsl(value).split(" ");
          const l = Number(secondary[2].replace("%", "")) - 10;
          secondary[2] = (l < 0 ? 0 : l) + "%";
          root.style.setProperty("--secondary-dark", secondary.join(" "));
        }
      });
    }
  }, [currentTheme, mergedTheme]);

  const value = {
    userTheme: mergedTheme,
    setUserTheme: (updatedTheme: Partial<UserTheme>) => {
      setCurrentTheme((prevTheme) => {
        const newTheme = { ...prevTheme, ...updatedTheme };
        return newTheme;
      });
    },
    userLogos: logos,
    themeReady,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
