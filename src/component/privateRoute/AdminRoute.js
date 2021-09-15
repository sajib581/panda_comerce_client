import React, { useContext } from 'react';
import {
    Redirect, Route
} from "react-router-dom";
import { LoggedInContext } from '../../App';


const AdminRoute = ({ children, ...rest }) => {
    const [logedInUser, setlogedInUser] = useContext (LoggedInContext)
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
            logedInUser.role === 'admin'  ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default AdminRoute;