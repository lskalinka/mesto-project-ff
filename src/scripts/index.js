import '../pages/index.css'; //импортируем файл со всеми стилями
import { createCard, deleteCard, likeCard } from './card.js'; //импортируем функции для работы с карточками
import { openPopup, closePopup } from './modal.js'; //импортируем функции для работы попапов
import { clearValidation, enableValidation } from './validation.js'; //импортируем функции для очистки ошибок и валидации полей
import {
  patchServerProfile,
  postServerCard,
  patchServerAvatar,
  getServerProfile,
  getServerCards,
} from './api.js';

const cardsList = document.querySelector('.places__list'); //забираем список карточек из DOM
const editProfileButton = document.querySelector('.profile__edit-button'); //забираем кнопку редактирования профиля
const addCardButton = document.querySelector('.profile__add-button'); //забираем кнопку добавления карточки
const popupEdit = document.querySelector('.popup_type_edit'); //забираем блок с попапом редактирования профиля из DOM
const popupAddCard = document.querySelector('.popup_type_new-card'); //забираем блок с попапом добавления карточки из DOM
const popupImage = document.querySelector('.popup_type_image'); //забираем блок с попапом большой картинки из DOM
const fullImage = document.querySelector('.popup__image'); //забираем элемент картинки попапа
const userName = document.querySelector('.profile__title'); //забираем поле с именем пользователя
const userDescription = document.querySelector('.profile__description'); //забираем поле с описанием пользователя
const userAvatar = document.querySelector('.profile__image');
const editProfileForm = document.forms['edit-profile']; //забираем форму редактирования профиля
const addCardForm = document.forms['new-place']; //забираем форму добавления новой карточки
const editAvatarForm = document.forms['edit-avatar']; //забираем форму редактирования аватара
const inputAvatarFormLink = document.forms['edit-avatar']['link-avatar'];
const inputNameFormProfile = document.forms['edit-profile'].name; //забираем поле редактирования имени
const inputDescriptionFormProfile = document.forms['edit-profile'].description; //забираем поле редактирования описания
const inputTitleFormAddNewCard = document.forms['new-place']['place-name']; //забираем поле с названием карточки
const inputLinkFormAddNewCard = document.forms['new-place'].link; //забираем поле со ссылкой на картинку
const popupImageCaption = document.querySelector('.popup__caption'); //забираем подпись к большой картинке на попапе
const popups = document.querySelectorAll('.popup'); //забираем массив попапов
const editAvatarButton = document.querySelector('.profile__image-edit-button');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-isunactive',
  inputErrorClass: 'popup__input_type_error',
  inputUrlImageClass: 'popup__input-url-image',
  errorClass: 'popup__input-error_active',
}; //забираем настройки валидации

function addCard(cardElement) {
  cardsList.prepend(cardElement); //добавляем готовую карточку из переменной в DOM
}

addCardForm.addEventListener('submit', submitCardForm); //вешаем слушатель, который при отправке формы добавления карточки запускает функцию работы с данными формы

editProfileForm.addEventListener('submit', submitProfileForm); //вешаем слушатель, который при отправке формы редактирования профиля запускает функцию работы с данными формы

editProfileButton.addEventListener('click', () => {
  inputNameFormProfile.value = userName.textContent; //записываем в поле попапа с именем текущее значение имени
  inputDescriptionFormProfile.value = userDescription.textContent; //записываем в поле попапа с описанием текущее значение описания
  clearValidation(editProfileForm, validationConfig); //очищаем ошибки, оставшиеся с прошлого открытия
  openPopup(popupEdit); //запускаем функцию открытия попапа редактирования профиля
});

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard); //запускаем функцию открытия попапа добавления карточки
});

editAvatarButton.addEventListener('click', () => {
  openPopup(popupEditAvatar); //запускаем функцию открытия попапа добавления карточки
});

editAvatarForm.addEventListener('submit', editAvatarFormSubmit);

function openFullImage(evt) {
  openPopup(popupImage); //выполняем функцию открытия попапа
  fullImage.src = evt.target.closest('.card__image').src; //используем ссылку нажатой картинки в качестве ссылки для большой картинки
  fullImage.alt = evt.target.closest('.card__image').alt; //используем описание нажатой картинки как описание большой картинки
  popupImageCaption.textContent = evt.target.closest('.card__image').alt; //используем описание нажатой картинки как подпись к большой картинке
}

function submitProfileForm(evt) {
  evt.preventDefault(); //отменяем стандартное поведение формы
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  patchServerProfile(inputNameFormProfile, inputDescriptionFormProfile)
    .then(() => {
      userName.textContent = inputNameFormProfile.value; //заполняем поле имени в профиле данными из поля имени в форме
      userDescription.textContent = inputDescriptionFormProfile.value; //заполняем поле описания в профиле данными из поля описания в форме
      clearValidation(editProfileForm, validationConfig); //очищаем ошибки с прошлого открытия, делаем кнопку неактивной
      closePopup(popupEdit); //выполняем функцию закрытия попапа с формой
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

function submitCardForm(evt) {
  evt.preventDefault(); //отменяем стандартное поведение формы
  const item = {}; //создаем пустой объект
  item.likes = new Array();
  item.name = inputTitleFormAddNewCard.value; //записываем в свойство name объекта значение поля с названием карточки
  item.link = inputLinkFormAddNewCard.value; //записываем в свойство link объекта значение поля со ссылкой на картинку
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  postServerCard(item)
    .then((result) => {
      const cardElement = createCard(
        result,
        userName,
        deleteCard,
        likeCard,
        openFullImage
      ); //создаем карточку для каждого элемента из массива в cards.js, забирая из элементов имена и ссылки
      addCard(cardElement); //добавляем созданные карточки на страницу
      addCardForm.reset(); //очищаем поля формы
      clearValidation(addCardForm, validationConfig); //очищаем ошибки с прошлого открытия, делаем кнопку неактивной
      closePopup(popupAddCard); //вызывааем функцию закрытия попапа
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

function editAvatarFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение формы
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  patchServerAvatar(inputAvatarFormLink.value)
    .then(() => {
      userAvatar.style.backgroundImage =
        'url(' + inputAvatarFormLink.value + ')';
      editAvatarForm.reset(); //очищаем поля формы
      clearValidation(editAvatarForm, validationConfig); //очищаем ошибки с прошлого открытия, делаем кнопку неактивной
      closePopup(popupEditAvatar); //вызывааем функцию закрытия попапа
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

enableValidation(validationConfig); //включаем валидацию с настройками из переменной

Promise.all([getServerProfile(), getServerCards()])
  .then((results) => {
    userName.textContent = results[0]['name'];
    userName._id = results[0]['_id'];
    userDescription.textContent = results[0]['about'];
    userAvatar.style.backgroundImage = 'url(' + results[0]['avatar'] + ')';
    results[1].reverse();
    results[1].forEach((element) => {
      const cardElement = createCard(
        element,
        userName,
        deleteCard,
        likeCard,
        openFullImage
      ); //создаем карточку для каждого элемента из массива в cards.js, забирая из элементов имена и ссылки
      addCard(cardElement); //добавляем созданные карточки на страницу
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

export { addCard }; //экспортируем глобальную переменную
