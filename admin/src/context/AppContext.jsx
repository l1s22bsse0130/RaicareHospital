import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const Currency = 'RS'
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const calculateAge = (dob) => {
        const today = new Date();
        const birtDate = new Date(dob);
        let age = today.getFullYear() - birtDate.getFullYear();
        return age

    }
    const months = ["",'Jan',"Feb","Mar","Apr","May","Jun","Jul","Agg","Sep","Oct","Nov","Dec"];
    const slotDateFormate =(slotDate)=>{
      const dateArray = slotDate.split('_')
      return dateArray[0]+ " " +months[Number(dateArray[1])] + " " + dateArray[2]
  
    }

    const value = {
        calculateAge,
        slotDateFormate,
        Currency,backendUrl

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>


    )
}
export default AppContextProvider;