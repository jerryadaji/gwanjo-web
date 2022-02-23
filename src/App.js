import { Routes, Route } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"

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

function App() {
  return (
    <UserAuthContextProvider>
      <AdContextProvider>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="login" element={ <Login/> }/>
          <Route path="signup" element={ <Signup />}/>
          <Route path="forgot-password" element={ <ForgotPassword />}/>

          <Route path="change-password" element={ <ProtectedRoute><NewPassword/></ProtectedRoute> } />

          <Route path="dashboard" element={ <ProtectedRoute><Dashboard/></ProtectedRoute> } />
          <Route path="settings" element={ <ProtectedRoute><Settings/></ProtectedRoute> } />
          <Route path="create-ad" element={ <ProtectedRoute><CreateAd/></ProtectedRoute> } />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>    
      </AdContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
