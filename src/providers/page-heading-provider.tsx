import { createContext, useState, useCallback, ReactNode } from 'react';

interface PageHeadingContextInterface {
  customPageHeading: string | null;
  setPageHeading: (heading: string | null) => void;
}

const PageHeadingContext = createContext<PageHeadingContextInterface>({
  customPageHeading: null,
  setPageHeading: () => {}
});

export default function PageHeadingProvider({
  children
}: {
  children: ReactNode;
}) {
  const [customPageHeading, setCustomPageHeading] = useState<string | null>(
    null
  );

  const setPageHeading = useCallback((heading: string | null) => {
    setCustomPageHeading(heading);
  }, []);

  return (
    <PageHeadingContext.Provider
      value={{
        customPageHeading,
        setPageHeading
      }}
    >
      {children}
    </PageHeadingContext.Provider>
  );
}

export { PageHeadingContext };
