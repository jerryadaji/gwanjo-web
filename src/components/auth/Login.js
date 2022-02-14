import React from "react";
import { Link } from "react-router-dom";

const  Login = () => {
  return(
		<>
			<h1>Login</h1>
			<p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
		</>
	)
}

export default Login;