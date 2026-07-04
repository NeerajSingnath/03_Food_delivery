import { createContext } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const serverUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const primaryColor = '#ff4d2d';
  const bgColor = '#fff9f6';
  const borderColor = '#ddd';
  const contextValue = {
    serverUrl,
    primaryColor,
    bgColor,
    borderColor,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
