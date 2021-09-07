
import React from 'react';
import logo from '../images/header/logo.svg';
import { Link, useLocation } from 'react-router-dom';
function Header (props){
  const location  = useLocation();
  const [actionObj, setActionObj] = React.useState({
    action: location.pathname === '/sign-up' ? 'Войти' : 'Регистрация', 
    link:location.pathname === '/sign-up' ? '/sign-in': '/sign-up'});
  const onClickLink = (value) => {
    const action = value.currentTarget.innerText === 'Регистрация' ? 'Войти' : 'Регистрация';
    const link = value.currentTarget.innerText === 'Регистрация' ? '/sign-in' : 'sign-up';
    setActionObj({action, link});
  }
  return (
    <header className="header body__header">
    <img className="header__logo" src={logo} alt="Логотип сайта Mesto"/>
    <Link className="header__action" to={actionObj.link} onClick={onClickLink}>{actionObj.action}</Link>
    </header>
  )
}

export default Header;
