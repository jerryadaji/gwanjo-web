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
    let unsubscribe;

    const getAds = async () => {
      try{
        const q = query(collection(db, "ads"), where("uid", "==", user.uid));
  
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = querySnapshot.docs.map(doc => {
            let data = doc.data()
            return {id: doc.id, ...data, createdAt: data.createdAt ? data.createdAt.toMillis() : 0 }
          });
          data.sort( function(a, b){return a.createdAt - b.createdAt} )
          setAds(data)
        });
      } catch(err) {
        console.log(err)
      }
    }
  
    getAds()

    return unsubscribe
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