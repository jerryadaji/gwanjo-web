import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  sendPasswordResetEmail
} from "firebase/auth"
import { auth, db } from "../firebase"

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
      // Get user meta
      const getUserMeta = async () =>{
        if(currentUser){
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if(docSnap.exists()){
            const userMeta = docSnap.data()
            currentUser = {...currentUser, data: userMeta}
            setUser(currentUser)
          } else {
            setUser({ ...currentUser, data: {status: "pending"} })
          }
        } else {
          setUser(currentUser)
        }
      }

      getUserMeta()
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