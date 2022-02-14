import React from "react";
import { Link } from "react-router-dom";

const  Home = () => {
return(
		<>
      <h1>Home</h1>
			<p><Link to="/login">Login In</Link></p>
      <p><Link to="/signup">Sign Up</Link></p>
		</>
	)
}

export default Home;