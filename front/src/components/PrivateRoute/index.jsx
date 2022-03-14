import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  

    const {isauth , role} = useContext(AuthContext)

    return (
        <Route {...rest} render={props => {
            if (!isauth)
                return <Redirect to={{
                    pathname: '/authentication',
                    state: { from: props.location }
                }} />

            if (!roles.includes(role))
                return <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute;