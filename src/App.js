import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Admin from './component/Admin/Admin';
import Contact from './component/Contact/Contact';
import Home from './component/Home/Home/Home';
import LoginScreen from './component/Login/LoginScreen';
import RegisterScreen from './component/Login/RegisterScreen';
import AdminRoute from './component/privateRoute/AdminRoute';
import Shop from './component/Shop/Shop';

export const LoggedInContext = createContext();

function App() {
    const [logedInUser, setlogedInUser]  = useState({
        userId : "",
        username : '',
        mobile : "" ,
        email : '',
        role : '',
        avatar : ""
    })
    
    return (
        <LoggedInContext.Provider value={[logedInUser, setlogedInUser]}>
            <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/shop">
                    <Shop />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <AdminRoute path="/admin">
                        <Admin  />
                    </AdminRoute>
                    <Route path="/login">
                        <LoginScreen  />
                    </Route>
                    <Route path="/register">
                        <RegisterScreen  />
                    </Route>
                    <Route path="*">
                        <h1>404 not found</h1>
                    </Route>
                </Switch>
            </div>
            <ToastContainer />
        </Router>
    
        </LoggedInContext.Provider>
    );
}

export default App;
