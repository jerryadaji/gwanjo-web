import { Box, Container, Link, Typography } from "@mui/material";

const Footer = () => {
  return(
    <Box 
      sx={{
        backgroundColor: "white", 
        mt: 6,
        py: 2
      }}
    >
      <Container>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          align="left"
          mt={2}
          pr={6}
        >Copyright © Gwanjo {new Date().getFullYear()}</Typography>
        <Link 
          href="/about" 
          color="text.secondary" 
          variant="caption"
          sx={{ pr: 4 }}
          >About</Link>
        <Link 
          href="/terms" 
          color="text.secondary" 
          variant="caption"
          sx={{ pr: 4 }}
          >Terms & Conditions</Link>
        <Link 
          href="/terms" 
          color="text.secondary" 
          variant="caption"
          sx={{ pr: 4 }}
          >Privacy Policy</Link>
        <Link 
          href="/security" 
          color="text.secondary" 
          variant="caption"
          sx={{ pr: 4 }}
          >Security</Link>
        <Link 
          href="/security" 
          color="text.secondary" 
          variant="caption"
          sx={{ pr: 4 }}
          >Help & Contact</Link>
      </Container>
    </Box>
  )
}

export default Footer;