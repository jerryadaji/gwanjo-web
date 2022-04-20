import { collection, getDocs, query, where } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../../firebase"
import Loader from "../Loader";
import Ad from "./AdCard";

import { Alert, Box, Grid, Typography } from '@mui/material';
import { useSearchParams } from "react-router-dom";
import Pagination from "../elements/PaginationElement";
import NumberText from "../elements/NumberText";
import SortMenu from "../elements/adfilter/SortMenu";

const AdList = ({ hasQuery, subCategory }) => {
  const [ads, setAds] = useState("")
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [adCount, setAdCount] = useState("");
  const [error, setError] = useState("")

  let [searchParams, setSearchParams] = useSearchParams()

  const maxAdsOnPage = 16;

  // Filter Min
  const filterMin = ( data, value ) => {
    const filteredData = data.filter( item => item.price >= value )
    return filteredData;
  }

  // Filter Min
  const filterMax = ( data, value ) => {
    const filteredData = data.filter( item => item.price <= Number(value) )
    return filteredData;
  }
  
  // Filter by page
  const filterByPage = ( data, currentPage, total ) => {
    let paged = []
    
    if(currentPage > 1 || data.length > maxAdsOnPage){
      // Calculate last index
      let lastIndex = (currentPage * maxAdsOnPage)
      
      // Set last index
      lastIndex = (data.length > lastIndex ) ? lastIndex : data.length ;
      
      for (let index = (currentPage - 1) * maxAdsOnPage; index < lastIndex; index++) {
        paged.push( data[index] );
      }

    } else {
      for (let index = 0; index < data.length; index++) {
        paged.push( data[index] );
      }
    }
    
    return paged
  }

  // multiplier
  const multiplier = ( data, number ) => {
    let multiplied = []

    for (let index = 0; index <= number; index++) {
      multiplied = [...multiplied, ...data];  
    }
    return multiplied
  }
  
  useEffect(() => {
    const userLocation = JSON.parse(localStorage.getItem('location'))
    const currentPage = Number( searchParams.get("page") ) || 1;

    const getAds = async () => {
      try{
        if( hasQuery ){
          let q = "";
          if( userLocation ){
            q = query(
              collection(db, "ads"), 
              where( "subCategory", "==", subCategory ),
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
            let adsData = data;

            // Filter by Min Price
            if( searchParams.get("min") ){
              adsData = filterMin(adsData, searchParams.get("min"))
            }

            // Filter by Max Price
            if( searchParams.get("max") ){
              adsData = filterMax(adsData, searchParams.get("max"))
            }

            // Sort

            // Multiplier
            adsData = multiplier(adsData, 1200)

            setAdCount(adsData.length)
            
            // Pagination
            const paged = filterByPage( adsData, currentPage, adsData.length ) 

            setAds(paged)
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
        <Box 
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="subtitle1">
            <NumberText value={adCount} /> ads found
          </Typography>  
          <SortMenu/>
        </Box>
        <Grid container spacing={2}>
          {ads.map((ad, index) => <Ad key={index} data={ad} isMine={false} />)}
        </Grid>
        { (adCount > maxAdsOnPage) && <Pagination count={adCount} maxAdsOnPage={maxAdsOnPage} /> }
      </>
    )
  }
}

export default AdList