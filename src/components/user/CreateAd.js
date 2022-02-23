import { useState } from "react";
import { Alert, Button, Form, Card } from "react-bootstrap"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase"
import AppLayout from "../layout/AppLayout"
import { useUserAuth } from "../../context/UserAuthContext";

const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); 

  let { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const docRef = await addDoc(collection(db, "ads"), {
        uid: user.uid,
        title: title,
        description: description
      });
      console.log("Document written with ID: ", docRef.id);
      //navigate(state?.redirectPath || "/dashboard");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }

  return(
    <AppLayout>
      <Card className="p-4">
        <h5 className="mb-4">Create Ad</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control 
                as="textarea" 
                rows={5} 
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Post Ad</Button>
            </div> 
          </Form>
      </Card>
    </AppLayout>
  )
}
export default CreateAd