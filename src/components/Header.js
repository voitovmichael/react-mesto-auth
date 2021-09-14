
import React from 'react';
import logo from '../images/header/logo.svg';
import { Link, useLocation } from 'react-router-dom';
function Header (props){
  const location  = useLocation();
  const [actionObj, setActionObj] = React.useState({
    action: location.pathname === '/sign-up' ? 'Войти' : 'Регистрация', 
    link:location.pathname === '/sign-up' ? '/sign-in': '/sign-up'});
  let email = props.email;

  const onClickLink = (value) => {
    const action = value.currentTarget.innerText === 'Регистрация' ? 'Войти' : 'Регистрация';
    const link = value.currentTarget.innerText === 'Регистрация' ? '/sign-in' : '/sign-up';
    setActionObj({action, link});
  }
  
  React.useEffect ( () => {
    if (email) {
      setActionObj({action: 'Выйти', link: '/sign-in'});
    } else {
      setActionObj({
        action: location.pathname === '/sign-up' ? 'Войти' : 'Регистрация', 
        link:location.pathname === '/sign-up' ? '/sign-in': '/sign-up'
      })
    }
  }, [email, location]);

  return (
    <header className="header body__header">
    <img className="header__logo" src={logo} alt="Логотип сайта Mesto"/>
    <div>
      { email ? <span className="header__email">{email}</span> : null }
      <Link className={`header__action ${email ? 'header__action_color_grey' : ''}`} 
        to={actionObj.link} onClick={ email ? props.logOut : onClickLink }>{actionObj.action}</Link>
    </div>
    </header>
  )
}

export default Header;
