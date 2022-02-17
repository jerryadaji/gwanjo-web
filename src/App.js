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

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="login" element={ <Login/> }/>
        <Route path="signup" element={ <Signup />}/>
        <Route path="forgot-password" element={ <ForgotPassword />}/>
        <Route path="dashboard" element={ 
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute> 
        }/>
          <Route path="settings" element={ 
          <ProtectedRoute>
            <Settings/>
          </ProtectedRoute> 
        }/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>    
    </UserAuthContextProvider>
  );
}

export default App;
