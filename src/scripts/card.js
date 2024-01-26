import { cardTemplate } from './index.js'; //импортируем переменную с шаблоном карточки

function createCard(item, deleteCard, likeCard, openFullImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонируем элемент карточки из шаблона в переменную
  const delButton = cardElement.querySelector('.card__delete-button'); //забираем кнопку удаления для карточки
  const cardImg = cardElement.querySelector('.card__image'); //забираем картинку карточки
  const LikeButton = cardElement.querySelector('.card__like-button'); //забираем кнопку лайка
  cardImg.src = item.link; //добавляем ссылку в источник картинки для карточки
  cardImg.alt = item.name; //добавляем alt для картинки
  cardElement.querySelector('.card__title').textContent = item.name; //добавляем название карточки
  delButton.addEventListener('click', () => {
    deleteCard(delButton); //по клику выполняем функцию удаления с аргументом-кнопкой
  });
  LikeButton.addEventListener('click', likeCard); //по клику на кнопку лайка запускаем функцию обработки лайков
  cardImg.addEventListener('click', openFullImage); //по клику на карточку запускаем функцию проверки, был ли клик по картинке
  return cardElement; //возвращаем элемент карточки
}

function deleteCard(button) {
  button.closest('.card').remove(); //удаляем ближайший к кнопке-аргументу элемент карточки
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active'); //переключаем класс постановки лайка
}

export { createCard, deleteCard, likeCard }; //экспортируем функции работы с карточками
