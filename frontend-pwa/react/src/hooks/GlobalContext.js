import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const GlobalStorage = ({children}) => {
  const [authorized,setAuthorized] = useState(false)
  const [admin,setAdmin] = useState(false)

  return (
    <GlobalContext.Provider value={{authorized,setAuthorized,admin,setAdmin}}>
      {children}
    </GlobalContext.Provider>
  )

}