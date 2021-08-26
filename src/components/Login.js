import React from 'react';
import AuthComponent from './AuthComponent.js';

function Login (props) {
  return (
    <AuthComponent title={props.title} submitTitle={props.submitTitle} placeholders={props.placeholders}></AuthComponent>
  )
}

export default Login;