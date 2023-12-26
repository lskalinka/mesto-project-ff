const cardTemplate = document.querySelector("#card-template").content; //забираем шаблон карточки
const cardsList = document.querySelector(".places__list"); //забираем список карточек из DOM

function addCards(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); //клонируем элемент карточки из шаблона в переменную
  const delButton = cardElement.querySelector(".card__delete-button"); //забираем кнопку удаления для карточки
  cardElement.querySelector(".card__image").src = link; //добавляем ссылку в источник картинки для карточки
  cardElement.querySelector(".card__image").alt = name; //добавляем alt для картинки
  cardElement.querySelector(".card__title").textContent = name; //добавляем название карточки
  delButton.addEventListener("click", () => {
    delCard(delButton); //по клику выполняем функцию удаления с аргументом-кнопкой
  });
  cardsList.append(cardElement); //добавляем готовую карточку из переменной в DOM
}

function delCard(button) {
  button.closest(".card").remove(); //удаляем ближайший к кнопке-аргументу элемент карточки
}

initialCards.forEach((element) => {
  addCards(element.name, element.link); //выполняем добавление карточки для каждого элемента из массива в cards.js, забирая из элементов имена и ссылки
});
