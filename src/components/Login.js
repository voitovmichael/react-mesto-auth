import React from 'react';
import AuthComponent from './AuthComponent.js';

function Login (props) {
  return (
    <AuthComponent title={props.title} submitTitle={props.submitTitle} placeholders={props.placeholders}
      onSubmit={props.onSignedIn}
    />
  )
}

export default Login;