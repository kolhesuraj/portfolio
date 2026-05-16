import Button from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider, { UserTheme } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";

const APP_ENV = import.meta.env.VITE_APP_ENV;

// eslint-disable-next-line react-refresh/only-export-components

const ErrorFallback = ({ error }: FallbackProps) => {
  const err = error as Error;
  console.log("error", err.stack);
  return APP_ENV !== "production" ? (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert">
      <h2 className="text-2xl font-semibold">Oops! Something went wrong.</h2>
      <pre className="text-2xl font-bold">{err.message}</pre>
      <pre>{err.stack || ""}</pre>
      <Button className="mt-4" asChild>
        <span
          className="cursor-pointer"
          onClick={() => {
            window.location.replace("/");
          }}>
          Back to home
        </span>
      </Button>
    </div>
  ) : (
    <></>
  );
};

const defaultTheme: UserTheme = {
  background: "",
  foreground: "",
  primary: "",
  primaryForeground: "",
  secondary: "",
  secondaryForeground: "",
  ternary: "",
  ternaryForeground: "",
  accent: "",
  accentForeground: "",
};

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userTheme, setUserTheme] = useState<UserTheme | null>(defaultTheme);
  const [logos] = useState({
    logo: "",
    horizontalLogo: "",
    icon: "",
  });
  const [themeReady, setThemeReady] = useState(false);
  const subdomain = window.location.hostname.split(".")[0];

  // Fetch user-specific theme before rendering the app
  useEffect(() => {
    const fetchUserTheme = async () => {
      try {
        setUserTheme(defaultTheme);
      } catch (error) {
        setUserTheme(defaultTheme);
        console.error("Error fetching user theme:", error);
      }
      setTimeout(() => {
        setThemeReady(true);
      }, 500);
    };

    fetchUserTheme();
  }, [subdomain]);

  return (
    <Suspense>
      <HelmetProvider>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {!themeReady ? (
              <div className="flex h-screen items-center justify-center">
                <span className="app-loader"></span>
              </div>
            ) : (
              ""
            )}
            <ThemeProvider
              defaultTheme={defaultTheme}
              userTheme={userTheme}
              logos={logos}
              themeReady={themeReady}>
              <Toaster />
              {children}
            </ThemeProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  );
}
