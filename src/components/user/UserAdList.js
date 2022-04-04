import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../../firebase"
import { useUserAuth } from "../../context/UserAuthContext";
import Loader from "../Loader";
import Ad from "../ad/AdCard";
import { Grid } from "@mui/material";

const UserAdList = () => {
  const [ads, setAds] = useState("")
  let { user } = useUserAuth();



  useEffect(() => {
    const getAds = async () => {
      try{
        const q = query(collection(db, "ads"), where("uid", "==", user.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const cities = [];
          const data = querySnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
          });
          setAds(data)
        });


      } catch(err) {
        console.log(err)
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
      <Grid container spacing={2}>
        {ads.map(ad => <Ad key={ad.id} data={ad} isMine={true} />)}
      </Grid>
    )
  }
}

export default UserAdList