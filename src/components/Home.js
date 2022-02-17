import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

const  Home = () => {
return(
		<AppLayout>
      <h1>Home</h1>
			<p><Link to="/login">Login In</Link></p>
      <p><Link to="/signup">Sign Up</Link></p>
		</AppLayout>
	)
}

export default Home;