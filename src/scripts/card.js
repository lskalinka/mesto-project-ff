import { cardTemplate, userName } from './index.js'; //импортируем переменную с шаблоном карточки
import { deleteServerCard, putServerLike, deleteServerLike } from './api.js';

function createCard(item, deleteCard, likeCard, openFullImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонируем элемент карточки из шаблона в переменную
  const delButton = cardElement.querySelector('.card__delete-button'); //забираем кнопку удаления для карточки
  const cardImg = cardElement.querySelector('.card__image'); //забираем картинку карточки
  const likeButton = cardElement.querySelector('.card__like-button'); //забираем кнопку лайка
  const likeAmount = cardElement.querySelector('.card__like-amount');
  cardImg.src = item.link; //добавляем ссылку в источник картинки для карточки
  cardImg.alt = item.name; //добавляем alt для картинки
  cardElement._id = item._id;
  cardElement.owner_id = item.owner._id;
  likeAmount.textContent = item.likes.length;
  item.likes.forEach(function (obj) {
    if (obj['_id'] === userName['_id']) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });
  cardElement.querySelector('.card__title').textContent = item.name; //добавляем название карточки
  delButton.addEventListener('click', () => {
    deleteCard(delButton); //по клику выполняем функцию удаления с аргументом-кнопкой
  });
  if (!(cardElement.owner_id === userName._id)) {
    delButton.remove();
  }
  likeButton.addEventListener('click', likeCard); //по клику на кнопку лайка запускаем функцию обработки лайков
  cardImg.addEventListener('click', openFullImage); //по клику на карточку запускаем функцию проверки, был ли клик по картинке
  return cardElement; //возвращаем элемент карточки
}

function deleteCard(button) {
  const card = button.closest('.card');
  deleteServerCard(card);
  card.remove(); //удаляем ближайший к кнопке-аргументу элемент карточки
}

function likeCard(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active'); //переключаем класс постановки лайка
  const card = likeButton.closest('.card');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    putServerLike(card)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        const likeAmount = card.querySelector('.card__like-amount');
        likeAmount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    deleteServerLike(card)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        const likeAmount = card.querySelector('.card__like-amount');
        likeAmount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

export { createCard, deleteCard, likeCard }; //экспортируем функции работы с карточками
