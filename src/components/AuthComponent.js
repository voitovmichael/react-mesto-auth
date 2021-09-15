import React from 'react';
import { Link } from 'react-router-dom';
function AuthComponent (props) {
  const placeholders = props.placeholders;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  /**
   * переопределяем обработчик отправки формы 
   * @param {event obj} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({email, password});
  }
  return (
    <div className="auth-form-container body__auth-form">
    <h2 className="auth-form__title">{props.title}</h2>
    <form className="auth-form" onSubmit={handleSubmit}>  
      <input className="auth-form__input auth-form__email" name="userEmail" type="email" placeholder={placeholders[0]} 
        value={email} onChange={ (evt) => { setEmail(evt.currentTarget.value) }}/>
      <input className="auth-form__input auth-form__password" name="userPassword" type="password" placeholder={placeholders[1]}
        value={password} onChange={ (evt) => { setPassword(evt.currentTarget.value) }}/>
      <button className="auth-form__confirm" type="submit">{props.submitTitle}</button>
      { props.isReg ? <Link className="auth-form__login" to="/sign-in">Уже зарегистрированы? Войти</Link> : null}
    </form>
    </div>
  )
}

export default AuthComponent;