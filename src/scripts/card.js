import { cardTemplate } from './index.js';
import { openFullImage } from './modal.js';

function createCard(item, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонируем элемент карточки из шаблона в переменную
  const delButton = cardElement.querySelector('.card__delete-button'); //забираем кнопку удаления для карточки
  const cardImg = cardElement.querySelector('.card__image'); //забираем картинку карточки
  cardImg.src = item.link; //добавляем ссылку в источник картинки для карточки
  cardImg.alt = item.name; //добавляем alt для картинки
  cardElement.querySelector('.card__title').textContent = item.name; //добавляем название карточки
  delButton.addEventListener('click', () => {
    deleteCard(delButton); //по клику выполняем функцию удаления с аргументом-кнопкой
  });
  cardElement.addEventListener('click', likeCard);
  cardElement.addEventListener('click', checkImage);
  return cardElement; //возвращаем элемент карточки
}

function deleteCard(button) {
  button.closest('.card').remove(); //удаляем ближайший к кнопке-аргументу элемент карточки
}

function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

function checkImage(evt) {
  if (evt.target.classList.contains('card__image')) {
    openFullImage(evt.target);
  }
}

export { createCard, deleteCard, likeCard, checkImage };
