import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
// import { CardContext } from '../contexts/CardContext.js';
export default function Main (props) {
  const currentUser = React.useContext(CurrentUserContext);
    const cardsArr = props.cards.map((card) => {
     return (
        <Card key={card._id} card={card}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
        />
     )
    });
    debugger;
    return (
      <main className="main">
        <section className="profile main__profile">
          <div className="profile__main-info">
            <div className="profile__avatar" onClick={props.onEditAvatar}
              style={{backgroundImage: `url(${currentUser.avatar})`}}></div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit" type="button" aria-label="Edit" onClick={props.onEditProfile}></button>
              <p className="profile__description">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" aria-label="Add" onClick={props.onAddPlace}>
          </button>
        </section>
        <section className="elements main__elements">
          <ul className="elements__list">
          <CurrentUserContext.Provider value={currentUser}>
            {cardsArr}
          </CurrentUserContext.Provider>
          </ul>
        </section>
      </main>
    )
}