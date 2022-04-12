import { collection, getDocs, query, where } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../../firebase"
import Loader from "../Loader";
import Ad from "./AdCard";

import { Alert, Grid } from '@mui/material';

const AdList = ({ hasQuery, subCategory }) => {
  const [ads, setAds] = useState("")
  const [error, setError] = useState("")
  
  useEffect(() => {
    const getAds = async () => {
      try{
        if( hasQuery ){

          const q = query(
            collection(db, "ads"), 
            where( "subCategory", "==", subCategory )
          );

          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
          });

          setAds(data)
        } else {
          const q = query( collection(db, "ads") );

          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
          });

          setAds(data)
        }
      } catch(err) {
        setError(err)
      }
    }

    getAds()
  }, []);

  if( ads === "" ){
    return (
      <Loader/>
    )
  } else {  
    return(
      <>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          {ads.map(ad => <Ad key={ad.id} data={ad} isMine={false} />)}
        </Grid>
      </>
    )
  }
}

export default AdList