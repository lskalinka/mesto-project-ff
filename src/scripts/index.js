import '../pages/index.css'; //импортируем файл со всеми стилями
import { initialCards } from './cards.js'; //импортируем массив с первыми 6 карточками
import { createCard, deleteCard, likeCard } from './card.js'; //импортируем функции для работы с карточками
import {
  openPopup,
  closePopup,
  closePopupButton,
  closePopupOverlay
} from './modal.js'; //импортируем функции для работы попапов

const cardsList = document.querySelector('.places__list'); //забираем список карточек из DOM
const cardTemplate = document.querySelector('#card-template').content; //забираем шаблон карточки
const editProfileButton = document.querySelector('.profile__edit-button'); //забираем кнопку редактирования профиля
const addCardButton = document.querySelector('.profile__add-button'); //забираем кнопку добавления карточки
const popupEdit = document.querySelector('.popup_type_edit'); //забираем блок с попапом редактирования профиля из DOM
const popupAddCard = document.querySelector('.popup_type_new-card'); //забираем блок с попапом добавления карточки из DOM
const popupImage = document.querySelector('.popup_type_image'); //забираем блок с попапом большой картинки из DOM
const fullImage = document.querySelector('.popup__image'); //забираем элемент картинки попапа
const userName = document.querySelector('.profile__title'); //забираем поле с именем пользователя
const userDescription = document.querySelector('.profile__description'); //забираем поле с описанием пользователя
const editProfileForm = document.forms['edit-profile']; //забираем форму редактирования профиля
const addCardForm = document.forms['new-place']; //забираем форму добавления новой карточки
const inputNameFormProfile = document.forms['edit-profile'].name; //забираем поле редактирования имени
const inputDescriptionFormProfile = document.forms['edit-profile'].description; //забираем поле редактирования описания
const inputTitleFormAddNewCard = document.forms['new-place']['place-name']; //забираем поле с названием карточки
const inputLinkFormAddNewCard = document.forms['new-place'].link; //забираем поле со ссылкой на картинку
const popupImageCaption= document.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

function addCard(cardElement) {
  cardsList.prepend(cardElement); //добавляем готовую карточку из переменной в DOM
}

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard, likeCard, openFullImage); //создаем карточку для каждого элемента из массива в cards.js, забирая из элементов имена и ссылки
  addCard(cardElement); //добавляем созданные карточки на страницу
});

addCardForm.addEventListener('submit', cardFormSubmit); //вешаем слушатель, который при отправке формы добавления карточки запускает функцию работы с данными формы

editProfileForm.addEventListener('submit', profileFormSubmit); //вешаем слушатель, который при отправке формы редактирования профиля запускает функцию работы с данными формы

editProfileButton.addEventListener('click', () => {
  inputNameFormProfile.value = userName.textContent; //записываем в поле попапа с именем текущее значение имени
  inputDescriptionFormProfile.value = userDescription.textContent; //записываем в поле попапа с описанием текущее значение описания
  openPopup(popupEdit); //запускаем функцию открытия попапа редактирования профиля
});

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard); //запускаем функцию открытия попапа добавления карточки
});

function openFullImage(evt) {
  openPopup(popupImage); //выполняем функцию открытия попапа
  fullImage.src = evt.target.closest('.card__image').src; //используем ссылку нажатой картинки в качестве ссылки для большой картинки
  fullImage.alt = evt.target.closest('.card__image').alt; //используем описание нажатой картинки как описание большой картинки
  popupImageCaption.textContent = evt.target.closest('.card__image').alt; //используем описание нажатой картинки как подпись к большой картинке
}

function profileFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение формы
  userName.textContent = inputNameFormProfile.value; //заполняем поле имени в профиле данными из поля имени в форме
  userDescription.textContent = inputDescriptionFormProfile.value; //заполняем поле описания в профиле данными из поля описания в форме
  closePopup(popupEdit); //выполняем функцию закрытия попапа с формой
}

function cardFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение формы
  const item = {}; //создаем пустой объект
  item.name = inputTitleFormAddNewCard.value; //записываем в свойство name объекта значение поля с названием карточки
  item.link = inputLinkFormAddNewCard.value; //записываем в свойство link объекта значение поля со ссылкой на картинку
  const cardElement = createCard(item, deleteCard, likeCard, openFullImage); //создаем элемент карточки с помощью функции создания карточки, на вход принимает созданный объект и коллбэк удаления карточки
  addCard(cardElement); //добавляем созданный элемент на страницу
  addCardForm.reset(); //очищаем поля формы
  closePopup(popupAddCard); //вызывааем функцию закрытия попапа
}

popupCloseButtons.forEach(function (item) {
  item.addEventListener('click', closePopupButton);
});

popups.forEach(function (item) {
  item.addEventListener('click', closePopupOverlay);
});

export {
  cardTemplate
}; //экспортируем глобальную переменную и функцию открытия большой картинки
