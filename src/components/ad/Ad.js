import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useAd } from "../../context/AdContext";
import AppLayout from "../layout/AppLayout";
import PageNotFound from "../PageNotFound";

const  Ad = () => {
  const [ poster, setPoster ]= useState("")
  const [ ad, setAd ]= useState("")

  // Get Ad ID from URL
  let { adId } = useParams();
  // Get Users
  let { users } = useAd();

  // Get Ad information
  useEffect(() => {
    const getAd = async () =>{
      const docRef = doc(db, "ads", adId);
      const docSnap = await getDoc(docRef);
      docSnap.exists() ? setAd(docSnap.data()) : setAd(null)
    }

    getAd()
  }, [])  
  
  if(ad === null){
    return(
      <PageNotFound/>
    )
  } else {
    // Get poster information from Uesrs array
    const getPoster = async () =>{
      try{
        if(users){
          const found = await users.find(user => user.uid === ad.uid);
          setPoster(found)
        }
      }catch(err){
        console.log(err)
      }
    }

    getPoster()

    return(
      <AppLayout>
        <h5 className="mb-4">{ad && ad.title}</h5>
        <p>{ad && ad.description}</p>
        {poster && <div>Posted by {poster.email}</div>}
      </AppLayout>
    )
  }
}

export default Ad;