import { collection, getDocs, query, where } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../../firebase"
import Loader from "../Loader";
import Ad from "./AdCard";

import { Alert, Grid, Typography } from '@mui/material';
import { useSearchParams } from "react-router-dom";

const AdList = ({ hasQuery, subCategory }) => {
  const [ads, setAds] = useState("")
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [error, setError] = useState("")

  let [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(() => {
    const userLocation = JSON.parse(localStorage.getItem('location'))

    const getAds = async () => {
      try{
        if( hasQuery ){
          let q = "";
          if( userLocation ){
            q = query(
              collection(db, "ads"), 
              where( "subCategory", "==", subCategory ),
              where( "price", ">=", Number(searchParams.get("min")) ),
              where( "price", "<=", Number(searchParams.get("max")) ),
              where( "region", "==", userLocation.id )
            );
          } else {
            q = query(
              collection(db, "ads"), 
              where( "subCategory", "==", subCategory ),
            );
          }

          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
          });

          if(data.length > 0){
            setAds(data)
          } else {
            setAds("empty")
          }
        } else {
          const q = query( collection(db, "ads") );

          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
          });

          if(data.length > 0){
            setAds(data)
          } else {
            setAds("empty")
          }
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
  } else if (ads === "empty"){
    return(
      <><Typography textAlign="center" variant="body1">No Ads found</Typography></>
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