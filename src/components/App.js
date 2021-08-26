import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';

function App (props) {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [actionObj, setActionObj] = React.useState({action: 'Регистрация', link: '/sign-up'})
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

  // обработчик смены действия
  const handleClickLink = () => {
    const action = actionObj.action === 'Регистрация' ? 'Войти' : 'Регистрация';
    const link = actionObj.link === '/sign-up' ? '/sign-in' : '/sign-up';
   setActionObj({action, link});
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
  //   api.getUserInfo()
  //   .then((response) => {
  //     setCurrentUser(response)
  //   });
  //   //Добавляем запрос на добавление карточек
  //   api.getCards()
  //  .then((cardsList) => {
  //    setCards(cardsList)
  //  })

    return () => {
      document.removeEventListener('keyup', clickEscape);
    }
  }, []);

  // обработчик закрытия Overlay
  const closeOverlay = (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closeAllPopups();
    }
  }

  // закрытие всех popup-ов
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
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
      <Header action={actionObj.action} onClickLink={handleClickLink} link={actionObj.link} />
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/sign-in">
          <Login title="Вход" submitTitle="Войти" placeholders={['Email', 'Пароль']}/>
        </Route>
        <Route path="/sign-up">
          <Register title="Регистрация" submitTitle="Зарегистрироваться" placeholders={['Email', 'Пароль']}/>
        </Route>
        <ProtectedRoute 
            loggedIn={loggedIn}
            path='/'
            redirectPath='/sign-in'
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
          <InfoTooltip />
          <Route path='/editprofile'>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeOverlay} onUpdateUser={handleUpdateUser}/>
          </Route>
          
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeOverlay} onAddPlace={handleAddPlace}/>
          <ImagePopup card={selectedCard} onClose={closeOverlay} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeOverlay} onUpdateAvatar={handleUpdateAvatar} />
      </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
