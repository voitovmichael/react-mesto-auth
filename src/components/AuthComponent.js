import React from 'react';

function AuthComponent (props) {
  const placeholders = props.placeholders;
  /**
   * переопределяем обработчик отправки формы 
   * @param {event obj} e 
   */
  const handleSubmit = (e) => {
    const data = {}
    e.preventDefault();
    const inputArr = Array.from(e.currentTarget.children);
    inputArr.forEach((item) => {
      if(item.type !== 'submit') {
        data[item.type] = item.value
      }
    });
    props.onSubmit(data);
  }
  return (
    <div className="auth-form-container body__auth-form">
    <h2 className="auth-form__title">{props.title}</h2>
    <form className="auth-form" onSubmit={handleSubmit}>  
      <input className="auth-form__input auth-form__email" name="userEmail" type="email" placeholder={placeholders[0]} />
      <input className="auth-form__input auth-form__password" name="userPassword" type="password" placeholder={placeholders[1]}/>
      <button className="auth-form__confirm" type="submit">{props.submitTitle}</button>
    </form>
    </div>
  )
}

export default AuthComponent;