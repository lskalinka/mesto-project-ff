import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard, checkImage } from './card.js';
import {
  openPopup,
  closePopup,
  openFullImage,
  profileFormSubmit,
  cardFormSubmit,
} from './modal.js';

const cardsList = document.querySelector('.places__list'); //забираем список карточек из DOM
const cardTemplate = document.querySelector('#card-template').content; //забираем шаблон карточки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const fullImage = document.querySelector('.popup__image');
const userName = document.querySelector('.profile__title');
const userSpec = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const popupName = document.forms['edit-profile'].name;
const popupSpec = document.forms['edit-profile'].description;
const nameCard = document.forms['new-place']['place-name'];
const imageCard = document.forms['new-place'].link;

function addCard(cardElement) {
  cardsList.prepend(cardElement); //добавляем готовую карточку из переменной в DOM
}

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard); //создаем карточку для каждого элемента из массива в cards.js, забирая из элементов имена и ссылки
  addCard(cardElement); //добавляем созданные карточки на страницу
});

addCardForm.addEventListener('submit', cardFormSubmit);

editProfileForm.addEventListener('submit', profileFormSubmit);

editProfileButton.addEventListener('click', () => {
  popupName.value = userName.textContent;
  popupSpec.value = userSpec.textContent;
  openPopup(popupEdit);
});

addCardButton.addEventListener('click', () => {
  
  openPopup(popupAddCard);
});

export {
  fullImage,
  userName,
  userSpec,
  nameCard,
  imageCard,
  popupImage,
  popupAddCard,
  popupEdit,
  cardTemplate,
  popupName,
  popupSpec,
  addCard,
};
