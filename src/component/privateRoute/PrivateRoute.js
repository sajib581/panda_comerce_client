import React, { useContext } from 'react';
import {
    Redirect, Route
} from "react-router-dom";
import { AdminContext } from '../../App';


const PrivateRoute = ({ children, ...rest }) => {
    const [admin, setAdmin] = useContext (AdminContext)
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
              admin  ? (
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

export default PrivateRoute;