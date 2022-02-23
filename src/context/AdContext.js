import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase"

const adContext = createContext();

export function AdContextProvider({children}){
  function createAd(password){
    return "";
  }

  return <adContext.Provider value={{createAd}}>{children}</adContext.Provider>
}

export function useAd(){
  return useContext(adContext)
}