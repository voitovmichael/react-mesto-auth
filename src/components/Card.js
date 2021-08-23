import React from 'react';
// import { currentUser } from "../contexts/CardContext.js";//
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
function Card (props){
  // const card = React.useContext(CardContext);
  const currentUser = React.useContext(CurrentUserContext)
  const handleClick = () => {
    props.onCardClick(props.card)
  }
  const handleLike = () => {
    props.onCardLike(props.card);
  }
  const handleDelete = () => {
    props.onCardDelete(props.card)
  }
  const isOwn = props.card.owner._id === currentUser._id;
  const isLike = props.card.likes.length > 0;
  return (
        <li className="element">
          <div className={`element__delete ${isOwn ? 'element__delete_active' : ''}`}>
            <button className="element__delete-button" onClick={handleDelete}></button> 
          </div>
          <img className="element__image" src={props.card.link} alt={props.card.name}
            onClick={handleClick}
          />
          <div className="element__group">
            <h2 className="element__name">{props.card.name}</h2>
            <div className="element__like-group">
              <button className={`element__like ${isLike ? 'element__like_active' : ''}`} onClick={handleLike}></button>
              <span className="element__like-counter">{props.card.likes.length}</span>
            </div>
          </div>
        </li>
  )
}

export default Card;