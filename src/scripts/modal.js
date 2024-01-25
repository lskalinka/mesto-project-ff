import {
  fullImage,
  userName,
  userSpec,
  nameCard,
  imageCard,
  addCard,
  popupImage,
  popupAddCard,
  popupEdit,
  popupName,
  popupSpec,
} from './index.js';
import { createCard, deleteCard } from './card.js';

function openPopup(popup) {
  popup.classList.add('popup_is-opened');  
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    } else if (evt.target === evt.target.closest('.popup__close')) {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
  popup.removeEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    } else if (evt.target === evt.target.closest('.popup__close')) {
      closePopup(popup);
    }
  });
}

function openFullImage(target) {
  openPopup(popupImage);
  fullImage.src = target.closest('.card__image').src;
  fullImage.alt = target.closest('.card__image').alt;
  document.querySelector('.popup__caption').textContent =
    target.closest('.card__image').alt;
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = popupName.value;
  userSpec.textContent = popupSpec.value;
  closePopup(popupEdit);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const item = {};
  item.name = nameCard.value;
  item.link = imageCard.value;
  const cardElement = createCard(item, deleteCard);
  addCard(cardElement);
  nameCard.value = '';
  imageCard.value = '';
  closePopup(popupAddCard);
  return cardElement;
}

export {
  openPopup,
  closePopup,
  openFullImage,
  profileFormSubmit,
  cardFormSubmit,
};
