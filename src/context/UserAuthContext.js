import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updatePasswordx,
  updatePassword,
  sendPasswordResetEmail
} from "firebase/auth"
import { auth } from "../firebase"

const userAuthContext = createContext();

export function UserAuthContextProvider({children}){
  const [user, setUser] = useState("")

  function signUp(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function logIn(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function passwordResetEmail(email){
    const actionCodeSettings = {
      url: process.env.REACT_APP_SERVER_URL + '/login',
      handleCodeInApp: true
    };
    return sendPasswordResetEmail(auth, email, actionCodeSettings)
  }

  function changePassword(password){
    return updatePassword(password);
  }

  function logOut(){
    return signOut(auth);
  }

  function googleSignIn(){
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return <userAuthContext.Provider value={{user, signUp, logIn, logOut, googleSignIn, passwordResetEmail, changePassword}}>{children}</userAuthContext.Provider>
}

export function useUserAuth(){
  return useContext(userAuthContext)
}