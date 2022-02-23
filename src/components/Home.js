import React from "react";
import { Col, Row } from "react-bootstrap";
import Ad from "./ad/AdCard";
import AdList from "./ad/AdList";
import AppLayout from "./layout/AppLayout";

const  Home = () => {
  return(
		<AppLayout>
      <h5 className="mb-4">Home</h5>
      <AdList/>
		</AppLayout>
	)
}

export default Home;