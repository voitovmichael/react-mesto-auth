import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup (props) {
  // Объявляем контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);
  // Обявляем состояния (имя и описание)
  const [name, setName] = React.useState('Жак-Ив Кусто');
  const [description, setDescription] = React.useState('Морской исследователь');
  //объявляем методы изменения input-ов
  const changeName = (evt) => {
    // const newName = evt.currentTarget.value ? evt.currentTarget.value : name;
    setName(evt.currentTarget.value);
  }
  const changeDescription = (evt) => {
    const newDescriptiopn = evt.currentTarget.value ? evt.currentTarget.value : description;
    setDescription(newDescriptiopn);
  }
  //Создаем эфект для обновления state-переменных, при обновлении контекста 
  //текущего пользователя
  React.useEffect(() => {
    if(currentUser['name']) {setName(currentUser.name)};
    if(currentUser['about']) {setDescription(currentUser.about)};
  }, [currentUser, props.isOpen])
  //объявляем метод для сохранения данных по польховтелю
  const handleSubmit = (evt) => { 
    // api.changeUserInfo({name, description});
    evt.preventDefault();
    props.onUpdateUser({name, about: description});
  }
  //объявляем переменную для хранения input-ов
  const childrenEditProfile = (
    <>
      <input className="popup__input popup__input_purpose_name" name="element-name" type="text" placeholder="Имя"
        required minLength="2" maxLength="40" value={name} onChange={changeName}/>
      <span className="popup__input-error element-name-placeholder"></span>
      <input className="popup__input popup__input_purpose_description" name="element-link" type="text"  
        placeholder="Описание деятельности" required minLength="2" maxLength="200" value={description} onChange={changeDescription}/>
      <span className="popup__input-error element-link-placeholder"></span>
      {/* <button className="popup__confirm" type="submit">Сохранить</button> */}
    </>
  );
  return (
    <PopupWithForm name="editProfile" title="Редактировать профиль" 
              isOpen={props.isOpen}
              onClose={props.onClose}
              onSubmit={handleSubmit}
              buttonText='Сохранить'>
              {childrenEditProfile}
    </PopupWithForm>
  )
}

export default EditProfilePopup;