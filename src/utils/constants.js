import kras from '../images/elements/Galickii-park.jpg';
const ESC_CODE = 27;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Краснодар',
    link: kras
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const objFormParams = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__confirm',
  inputError: 'popup__input_error',
  inputErrorActive: 'popup__input-error_active',
  saveButtonActive: 'popup__confirm_active'
}

const token = 'e2787495-d10a-4c6a-a5f2-7d4ee36816fa';

export {ESC_CODE, initialCards, objFormParams, token};