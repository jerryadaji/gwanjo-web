import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useAd } from "../../context/AdContext";
import AppLayout from "../layout/AppLayout";
import PageNotFound from "../PageNotFound";
import Gallery from "./page/gallery/Gallery";
import { Grid } from "@mui/material";
import AdDescription from "./page/AdDescription";
import AdInfo from "./page/AdInfo";
import PosterInfo from "./page/PosterInfo";


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
      docSnap.exists() ? setAd({id: docSnap.id, ...docSnap.data()}) : setAd(null)
      console.log(ad)
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Gallery adId={adId}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <AdInfo title={ad.title} poster={poster}/>
            <PosterInfo poster={poster}/>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={10} lg={1}></Grid>
              <Grid item xs={12} md={10} lg={11}>
                <AdDescription description={ad.description}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        
      </AppLayout>
    )
  }
}

export default Ad;