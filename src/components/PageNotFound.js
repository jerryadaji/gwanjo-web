import { Link } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

const  PageNotFound = () => {
  return(
    <AppLayout className="text-center">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Homepage</Link>
    </AppLayout>
	)
}

export default PageNotFound;