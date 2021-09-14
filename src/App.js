import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from './component/Admin/Admin';
import Contact from './component/Contact/Contact';
import Home from './component/Home/Home/Home';
import LoginScreen from './component/Login/LoginScreen';
import RegisterScreen from './component/Login/RegisterScreen';
import PrivateRoute from './component/privateRoute/PrivateRoute';
import Shop from './component/Shop/Shop';

export const AdminContext = createContext();

function App() {
    const [admin, setAdmin]  = useState(null)
    console.log(admin);
    return (
        <AdminContext.Provider value={[admin, setAdmin]}>
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
                    <PrivateRoute path="/admin">
                        <Admin  />
                    </PrivateRoute>
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
        </Router>
    
        </AdminContext.Provider>
    );
}

export default App;
