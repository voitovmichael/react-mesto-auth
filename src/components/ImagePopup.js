function ImagePopup (props) {
  return (
    <section className={`popup popup_type_image ${props.isTooltip && 'popup_image-tooltip'} ${props.card && 'popup_opened'}`} onClick={props.onClose}>
    <button className="popup__close-button" type="reset" aria-label="Close"></button>
    <figure className={`popup__container popup__figure ${props.isTooltip && 'tooltip'}`}>
      <img className={`popup__image ${props.isTooltip && 'tooltip__img'}`} src={props.card && props.card.link} 
        alt={props.card && props.card.name} />
      <figcaption className={`popup__figcaption ${props.isTooltip && 'tooltip__caption'}`}>{props.card && props.card.name}</figcaption>
    </figure>
    </section>
  )
}

export default ImagePopup;
