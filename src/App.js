import { Routes, Route } from "react-router-dom"

import Home from "./components/Home"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import ForgotPassword from "./components/auth/ForgotPassword"
import Dashboard from "./components/user/Dashboard"
import Settings from "./components/user/Settings"
import PageNotFound from "./components/PageNotFound"

import ProtectedRoute from "./components/user/ProtectedRoute"

import { UserAuthContextProvider } from "./context/UserAuthContext"
import { AdContextProvider } from "./context/AdContext"
import NewPassword from "./components/auth/NewPassword"
import CreateAd from "./components/user/CreateAd"
import Ad from "./components/ad/Ad"
import EditAd from "./components/user/EditAd"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScrollToTop from "./components/ScrollToTop"


const theme = createTheme({
  palette: {
    primary: {
      //main: "#44079c",
      main: "#702963",
      //main: "#770737",
    },
    secondary: {
      main: "#ffbf00",
    },
  },
});

function App() {
  return (
    <UserAuthContextProvider>
      <AdContextProvider>
      <ThemeProvider theme={theme}>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="login" element={ <Login/> }/>
            <Route path="signup" element={ <Signup />}/>
            <Route path="forgot-password" element={ <ForgotPassword />}/>

            <Route path="change-password" element={ <ProtectedRoute><NewPassword/></ProtectedRoute> } />

            <Route path="dashboard" element={ <ProtectedRoute><Dashboard/></ProtectedRoute> } />
            <Route path="settings" element={ <ProtectedRoute><Settings/></ProtectedRoute> } />
            <Route path="create-ad" element={ <ProtectedRoute><CreateAd/></ProtectedRoute> } />
            <Route path="edit-ad/:adId" element={ <ProtectedRoute><EditAd /></ProtectedRoute> } />

            <Route path="ad/:adId" element={ <Ad /> } />
            
            <Route path="*" element={<PageNotFound />} />
          </Routes>    
          </ScrollToTop>
        </ThemeProvider>
      </AdContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
