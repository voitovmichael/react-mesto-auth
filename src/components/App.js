import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import auth from '../utils/authorization.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import logoFail from '../images/InfoTooltip/Fail.svg';
import logoSuccess from '../images/InfoTooltip/Success.svg';


function App (props) {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [succsessObj, setSuccessObj] = React.useState({image: null, caption: null});
  const history = useHistory();
  const _ESC_CODE = 27;

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  // обработчик открытия popup-a добавления карточки
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  // обработчик открытия карточки
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  //метод логирования ошибок
  const reject = (err) => {
    
    console.log(err);
  }
  const handleAuth = (message, result) => {
    debugger;
    let caption;
    if(result['error'] !== undefined) { caption = result['error'] } 
    if(result['message'] !== undefined) { caption = result['message'] }
      if(caption !== undefined) {
        setSuccessObj({image: logoFail, caption});
      } else {
        setLoggedIn(true);
        history.push('/'); 
        setSuccessObj({image: logoSuccess, caption: message});
      }
    // .catch(reject);
  }
  /**
   * handleSignUp - метод отправки запроса для регистрации
   * @param {{email, password}} data 
   */
  const handleSignUp = (data) => {
    auth.signUp(data)
    .then(handleAuth.bind(this, 'Вы успешно зарегистрировались!'))
    .catch(reject);
  } 
  /**
   * handleSignUp - метод отправки запроса для авторизации
   */
  const handleSignIn = (data) => {
    auth.signIn(data)
    // auth.checkUser({jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM3M2JhYTg3Yzg3YjAwMWFiMzEzOGMiLCJpYXQiOjE2MzEwMjU5NjZ9.1M51wt5MYfg53RQE9Nx1g9hGotAPoNEnCi3szricZTM'})
    .then(handleAuth.bind(this, 'Вы успешно авторизовались!'))
    .catch(reject);
  }
  // обработчик нажатия ESC
  React.useEffect(() => {
    const clickEscape = (evt) => {
      if(evt.keyCode === _ESC_CODE) {
        closeAllPopups();
      }
    }

    document.addEventListener('keyup', clickEscape);
    
    //делаем запрос данных текщего пользователя через API
    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userInfo, cardsList]) => {
      setCurrentUser(userInfo);
      setCards(cardsList);
    })
    .catch(reject)
    return () => {
      document.removeEventListener('keyup', clickEscape);
    }
  }, []);
  /**
   * обработчик закрытия InfoTooltip
   */
  const closeInfoTooltip = () => {
    if(loggedIn) { history.push('/') }
    setSuccessObj({image: null, caption: null});
  }
  // обработчик закрытия Overlay
  const closeOverlay = (evt) => {
    debugger
    if(evt.target.parentElement.classList.contains('popup_image-tooltip')) {
      closeInfoTooltip();
    }
    else if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closeAllPopups();
    }
  }
  // закрытие всех popup-ов
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    // setSuccessObj({image: null, caption: null});
    // closeInfoTooltip();
    // closeInfoTooltip();
    
  }

  //объявляем обновление данных по пользователю
  const handleUpdateUser = ({name, about}) => {
    if(name && about) {
      api.changeUserInfo({name, about})
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      });
    }
  }
  //Обновляем аватар
  const handleUpdateAvatar = (avatar) => {
    if(avatar) {
      api.changeAvatar({avatar})
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
    }
  }
  const handleAddPlace = ({name, link}) => {
    api.addCard({name, link})
    .then((newCard) => {
       setCards([newCard, ...cards])
       closeAllPopups();
     })
    .catch(reject);
  }
  //метод обработки простановки лайков
  const handleCardLike = (card) => {
    const isLike = card.likes.some(i => i._id === currentUser._id);// this.context._id);
    api.changeLike(card._id, !isLike)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === newCard._id ? newCard : c);
      setCards(newCards)
    })
    .catch(reject);
  }

 const handleCardDelete = (delCard) => {
   api.deleteCard(delCard._id)
   .then(() => {
      const newCards = cards.filter((card) => delCard._id !== card._id ? card : null);
      setCards(newCards);
   })
   .catch(reject);
 }
  return (
    <div className="App">
      <Header/>
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
      
      <Route path="/sign-up">
        <Register title="Регистрация" submitTitle="Зарегистрироваться" placeholders={['Email', 'Пароль']} 
        onSignedUp={handleSignUp}
        />
        <InfoTooltip succsessObj={succsessObj} onClose={closeOverlay} />
      </Route>
      <Route path="/sign-in">
        <Login title="Вход" submitTitle="Войти" placeholders={['Email', 'Пароль']}
          onSignedIn={handleSignIn}
        />
        <InfoTooltip succsessObj={succsessObj} onClose={closeOverlay} />
      </Route>

      <ProtectedRoute
            loggedIn={loggedIn}
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}> 
        </ProtectedRoute>
      
        <Footer/>

      </Switch>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeOverlay} onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeOverlay} onAddPlace={handleAddPlace}/>
          <ImagePopup card={selectedCard} onClose={closeOverlay} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeOverlay} onUpdateAvatar={handleUpdateAvatar} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
