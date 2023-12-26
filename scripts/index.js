const cardTemplate = document.querySelector('#card-template').content; //забираем шаблон карточки
const cardsList = document.querySelector('.places__list'); //забираем список карточек из DOM

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
  return cardElement; //возвращаем элемент карточки
}

function addCard(cardElement) {
  cardsList.append(cardElement); //добавляем готовую карточку из переменной в DOM
}

function deleteCard(button) {
  button.closest('.card').remove(); //удаляем ближайший к кнопке-аргументу элемент карточки
}

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard); //создаем карточку для каждого элемента из массива в cards.js, забирая из элементов имена и ссылки
  addCard(cardElement); //добавляем созданные карточки на страницу
});