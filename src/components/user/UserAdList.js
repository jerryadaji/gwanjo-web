import { collection, getDocs, query, where } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { db } from "../../firebase"
import { useUserAuth } from "../../context/UserAuthContext";
import Loader from "../Loader";
import Ad from "../ad/AdCard";

const UserAdList = () => {
  const [ads, setAds] = useState("")
  let { user } = useUserAuth();

  useEffect(() => {
    const getAds = async () => {
      try{
        const q = query(collection(db, "ads"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
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
        {ads.map(ad => <Ad key={ad.id} data={ad} isMine={true} />)}
      </Row>
    )
  }
}

export default UserAdList