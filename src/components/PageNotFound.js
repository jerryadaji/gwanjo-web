import { Box, Link, Typography } from "@mui/material";
import AppLayout from "./layout/AppLayout";

const  PageNotFound = () => {
  return(
    <AppLayout className="text-center">
      <Box textAlign={"center"}>
        <Typography 
          color="primary"
          component="h2"
          variant="h1" mb={0}
        >
          404
        </Typography>
        <Typography variant="body2" mb={3} component="p">Oops. the page you are looking for was not found.</Typography>
        <Typography variant="subtitle2" mb={2} component="p">
          <Link href="/login">Go to Homepage</Link>
        </Typography>
      </Box>
    </AppLayout>
	)
}

export default PageNotFound;