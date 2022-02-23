import { collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { db } from "../../firebase"
import Loader from "../Loader";
import Ad from "./AdCard";

const AdList = () => {
  const [ads, setAds] = useState("")


  useEffect(() => {
    const getAds = async () => {
      try{
        const querySnapshot = await getDocs(collection(db, "ads"));
        const data = querySnapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()}
        });
        setAds(data)
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
      <Row>
        {ads.map(ad => <Ad key={ad.id} data={ad} />)}
      </Row>
    )
  }
}

export default AdList