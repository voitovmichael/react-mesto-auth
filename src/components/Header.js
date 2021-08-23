
import logo from '../images/header/logo.svg';

function Header (props){
  return (
    <header className="header body__header">
    <img className="header__logo" src={logo} alt="Логотип сайта Mesto"/>
    </header>
  )
}

export default Header;
