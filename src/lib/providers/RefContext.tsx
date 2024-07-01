import React from 'react';

interface RefTypes {
  profileRef: React.MutableRefObject<HTMLDivElement | null>;
}

const initialRefValue: RefTypes = {
  profileRef: React.createRef<HTMLDivElement>(),
};

const RefContext = React.createContext<RefTypes>(initialRefValue);

export const RefProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const profileRef = React.useRef<HTMLDivElement | null>(null);

  // Update the context value whenever profileRef changes
  const contextValue = React.useMemo(() => ({ profileRef }), [profileRef]);

  return (
    <RefContext.Provider value={contextValue}>{children}</RefContext.Provider>
  );
};

export default RefContext;
