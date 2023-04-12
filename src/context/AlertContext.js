import { createContext, useState } from 'react';

const ALERT_TIME = 5000;
const initialState = {
  data : {}
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const setAlert = (data) => {
    setData(data)
  };

  return (
    <AlertContext.Provider
      value={{
        data,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;