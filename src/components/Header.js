
import logo from '../images/header/logo.svg';
import { Link } from 'react-router-dom';
function Header (props){
  return (
    <header className="header body__header">
    <img className="header__logo" src={logo} alt="Логотип сайта Mesto"/>
    <Link className="header__action" to={props.link} onClick={props.onClickLink}>{props.action}</Link>
    </header>
  )
}

export default Header;
