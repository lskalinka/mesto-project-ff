function openPopup(popup) {
  popup.classList.add('popup_is-opened'); //открываем попап
  document.addEventListener('keydown', closePopupEscape); //если будет нажатие Esc, выполнить функцию закрытия попапа
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened'); //закрываем попап
  document.removeEventListener('keydown', closePopupEscape); //снять слушатель кнопки Esc
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened'); //записываем в локальную переменную открытый попап
    closePopup(popup); //при нажатии клавиши Esc выполняем функцию закрытия попапа
  }
}

export { openPopup, closePopup, closePopupEscape }; //экспортируем функции для работы с попапами
