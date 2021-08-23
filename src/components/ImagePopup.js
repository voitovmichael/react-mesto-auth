function ImagePopup (props) {
  return (
    <section className={`popup popup_type_image ${props.card && 'popup_opened'}`} onClick={props.onClose}>
    <button className="popup__close-button" type="reset" aria-label="Close"></button>
    <figure className="popup__container popup__figure">
      <img className="popup__image" src={props.card && props.card.link} 
        alt={props.card && props.card.name} />
      <figcaption className="popup__figcaption">{props.card && props.card.name}</figcaption>
    </figure>
    </section>
  )
}

export default ImagePopup;
