import {

  createContext,

  useContext,

  useState

} from "react"

const AppContext = createContext()

export function AppProvider({

  children

}) {

  const [

    selectedRegion,

    setSelectedRegion

  ] = useState("All Regions")

  const value = {

    selectedRegion,

    setSelectedRegion

  }

  return (

    <AppContext.Provider value={value}>

      {children}

    </AppContext.Provider>

  )
}

export function useAppContext() {

  return useContext(AppContext)

}