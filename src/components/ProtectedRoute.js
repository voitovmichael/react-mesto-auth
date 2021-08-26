import React from 'react-dom';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute ({component: Component, ...props}) {

  return (
    <Route path={props.path}>
      {props.loggedIn ?  <Component {...props}/>: <Redirect to={props.redirectPath}/>}
    </Route>
  )
}

export default ProtectedRoute;