import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase"

const adContext = createContext();

export function AdContextProvider({children}){
  const [users, setUsers] = useState()

  useEffect(() => {
    const getUsers = async () => {
      try{
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()}
        });
        setUsers(data)
      } catch(err) {
        console.log(err)
      }
    }

    getUsers()
  }, []);

  return <adContext.Provider value={{users}}>{children}</adContext.Provider>
}

export function useAd(){
  return useContext(adContext)
}