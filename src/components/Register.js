import React from 'react';
import AuthComponent from './AuthComponent.js';

function Register (props) {

  // const handleSubmit = (e) => {
  //   const data = {}
  //   e.preventDefault();
  //   const inputArr = Array.from(e.currentTarget.children);
  //   inputArr.forEach((item) => {
  //     if(item.type !== 'submit') {
  //       data[item.type] = item.value
  //     }
  //   });
  //   props.onSignedUp(data);
  // }

  return (
    <AuthComponent title={props.title} 
      submitTitle={props.submitTitle} 
      placeholders={props.placeholders}
      onSubmit={props.onSignedUp}

    />
  )
}

export default Register;