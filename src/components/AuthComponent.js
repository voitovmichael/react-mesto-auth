import React from 'react';

function AuthComponent (props) {
  const placeholders = props.placeholders;
  return (
    <div className="auth-form-container body__auth-form">
    <h2 className="auth-form__title">{props.title}</h2>
    <form className="auth-form">  
      <input className="auth-form__input auth-form__email" name="userEmail" type="email" placeholder={placeholders[0]} />
      <input className="auth-form__input auth-form__password" name="userPassword" type="password" placeholder={placeholders[1]}/>
      <button className="auth-form__confirm" type="submit">{props.submitTitle}</button>
    </form>
    </div>
  )
}

export default AuthComponent;