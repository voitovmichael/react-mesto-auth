import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {
  //Объявляем метод измеенения поля, содержащего ссылку на аватар
  const inputRef = React.useRef(null);

  const handleSubmit = (evt) => {
    const avatar = inputRef.current.value;
    evt.preventDefault();
    props.onUpdateAvatar(avatar);
  }

  const childrenEditAvatar = (
    <>
      <input className="popup__input popup__input_purpose_description popup__input_purpose_link" name="avatarEditor-link" type="url"  
        placeholder="Ссылка на картинку" ref={inputRef} />
      <span className="popup__input-error avatarEditor-link-placeholder"></span>
    </>
  );
  return (
    <PopupWithForm name="editAvatar" title="Обновить аватар"  buttonText='Сохранить'
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            {childrenEditAvatar}
    </PopupWithForm>
  )
}

export default EditAvatarPopup