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

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [succsessObj, setSuccessObj] = React.useState({image: null, caption: null});
  const [currentLogin, setCurrentLogin] = React.useState(null);
  const history = useHistory();
  const _ESC_CODE = 27;

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
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
  const handleAuth = (result) => {
    let caption, 
      email = result.data && result.data.email ? result.data.email : null;
    let token = result.token ? result.token : null;
    if(result['error'] !== undefined) { caption = result['error'] } 
    if(result['message'] !== undefined) { caption = result['message'] }
      if(caption !== undefined) {
        setSuccessObj({image: logoFail, caption});
        return null
      } else {
        return email ? email : token;
      }
  }
  /**
   * handleSignUp - метод отправки запроса для регистрации
   * @param {{email, password}} data 
   */
  const handleSignUp = (data) => {
    auth.signUp(data)
    .then(handleAuth)
    .then( (email) => {
      setCurrentLogin(email);
      setLoggedIn(true);
      setSuccessObj({image: logoSuccess, caption: 'Вы успешно зарегистрировались!'});
    })
    .catch( ( response ) => {
      reject(response);
      setSuccessObj({image: logoFail, caption: 'Что-то пошло не так! Попробуйте ещё раз.'});
    });
  } 
  /**
   * handleSignUp - метод отправки запроса для авторизации
   * @param {{email, password}} data 
   */
  const handleSignIn = (data) => {
    auth.signIn(data)
    .then( handleAuth )
    .then( (token) => {
      localStorage.setItem('token', token);
      setCurrentLogin(data.email);
      setLoggedIn(true);
      setSuccessObj({image: logoSuccess, caption: 'Вы успешно авторизовались!'}); 
    })
    .catch( ( response ) => {
      reject(response);
      setSuccessObj({image: logoFail, caption: 'Что-то пошло не так! Попробуйте ещё раз.'});
    });
  }

  // обработчик нажатия ESC
  const clickEscape = (evt) => {
  if(evt.keyCode === _ESC_CODE) {
    closeAllPopups();
    }
  };

  React.useEffect(() => {

    const jwt = localStorage.getItem('token');
    // // Проверяем коректность токена, если он верен, перебрасываем пользователя на глявную страницу
    if(jwt) {
      auth.checkUser({jwt})
      .then( handleAuth )
      .then( (email) => {
        // const data = result.data;
        if(email) {
          setLoggedIn(true);
          setCurrentLogin(email);
          history.push('/');
        }
      })
      .catch(reject);
    }

    //делаем запрос данных текщего пользователя через API
    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userInfo, cardsList]) => {
      setCurrentUser(userInfo);
      setCards(cardsList);
    })
    .catch(reject);
    document.addEventListener('keyup', clickEscape);
    return () => {
      document.removeEventListener('keyup', clickEscape);
    }
  }, [history, loggedIn]);
  /**
   * обработчик закрытия InfoTooltip
   */
  const closeInfoTooltip = () => {
    if(loggedIn) { history.push('/') }
    setSuccessObj({image: null, caption: null});
  }
  // обработчик закрытия Overlay
  const closeOverlay = (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closeAllPopups();
    }
  }

  // закрытие всех popup-ов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    closeInfoTooltip();
  }

  //объявляем обновление данных по пользователю
  const handleUpdateUser = ({name, about}) => {
    if(name && about) {
      api.changeUserInfo({name, about})
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(reject);
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
      .catch(reject);
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
 /**
  * Метод обрабатывает выход из учетной записи
  */
 const logOut = () => {
  localStorage.removeItem('token');
  setLoggedIn(false);
  setCurrentLogin(null);
 }

  return (
    <div className="App">
      <Header email = {currentLogin} logOut={logOut} />
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
        
        <Route path="/sign-up">
          <Register title="Регистрация" submitTitle="Зарегистрироваться" placeholders={['Email', 'Пароль']} 
          onSignedUp={handleSignUp} isReg={true}
          />
          
        </Route>
        <Route path="/sign-in">
          <Login title="Вход" submitTitle="Войти" placeholders={['Email', 'Пароль']}
            onSignedIn={handleSignIn}
          />
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
        <InfoTooltip succsessObj={succsessObj} onClose={closeOverlay} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
