import React, { useContext } from 'react';
import {
    Redirect, Route
} from "react-router-dom";
import { LoggedInContext } from '../../App';

const UserRoute = ({ children, ...rest }) => {
    const [logedInUser, setlogedInUser] = useContext (LoggedInContext)
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
            ['user', 'admin'].includes(logedInUser.role)  ? (
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

export default UserRoute;