function PopupWithForm (props){
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}
      onClick={props.onClose}
    >
    <button className="popup__close-button" type="reset" aria-label="Close"></button>
    <form className="popup__container" name={props.name} onSubmit={props.onSubmit}>
      <h2 className="popup__title">{props.title}</h2>
      {props.children}
      <button className='popup__confirm popup__confirm_active' type="submit">{props.buttonText}</button>
    </form>
  </section>
  )
}

export default PopupWithForm;