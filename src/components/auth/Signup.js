import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return(
    <>
			<h1>Signup</h1>
      <p>Already have an account? <Link to="/login">Log In</Link></p>
		</>
  )
}
  
export default Signup;