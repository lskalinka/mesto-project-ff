function openPopup(popup) {
  popup.classList.add('popup_is-opened');  //открываем попап
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
};

function closePopupButton(evt) {
  if (evt.target === evt.target.closest('.popup__close')) {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup); //при клике по крестику выполняем функцию закрытия попапа
  }
};

function closePopupOverlay(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (popup === evt.target) {    
    closePopup(popup); //при клике по оверлею выполняем функцию закрытия попапа
  }};

export {
  openPopup,
  closePopup,
  closePopupEscape,
  closePopupButton,
  closePopupOverlay
}; //экспортируем функции для работы с попапами
