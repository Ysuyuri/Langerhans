import React, {
    createContext,
    useContext,
    FC,
    useState,
  } from "react";
  import Realm from "realm";
  import getRealm from "../../infraestructure/realm";
  
  export const RealmContext = createContext<Realm | undefined>(undefined);
  
  const RealmContextProvider: FC = ({ children }) => {
    const [realm, setRealm] = useState<Realm | undefined>(undefined);
  
 
    return (
      <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
    );
  };
  
  export const useMainContext = () => useContext(RealmContext);
  
  export default RealmContextProvider;