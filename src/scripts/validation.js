const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //забираем span ошибки нужного поля
  inputElement.classList.add(validationConfig['inputErrorClass']); //вешаем на поле класс, который подсвечивает его, как неверно заполненное
  errorElement.textContent = errorMessage; //в span ошибки добавляем сообщение об ошибке
  errorElement.classList.add(validationConfig['errorClass']); //делаем span ошибки непрозрачным
}; 

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //забираем span ошибки нужного поля
  inputElement.classList.remove(validationConfig['inputErrorClass']); //убираем с поля класс, который подсвечивает его, как неверно заполненное
  errorElement.classList.remove(validationConfig['errorClass']); //делаем span ошибки прозрачным
  errorElement.textContent = ''; //очищаем span ошибки
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) { //если ошибка валидации связана с заданным паттерном
    if (inputElement.classList.contains('popup__input_type_url')) { //если поле с ошибкой — это поле, куда вставляется ссылка на картинку
      inputElement.setCustomValidity("Вставьте ссылку, которая ведет на изображение"); //то выводим кастомное сообщение об ошибке именно для этого поля
    } else { //если поле с ошибкой любое другое
      inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"); //то выводим кастомное сообщение об ошибке для остальных полей
    }
  } else { 
  inputElement.setCustomValidity(""); //иначе возвращаем стандартный текст
  }

  if (!inputElement.validity.valid) { //если валидация поля не прошла
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig); //то запускаем функцию показа ошибки
  } else {
    hideInputError(formElement, inputElement, validationConfig); //иначе запускаем функцию скрытия ошибки
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig['inputSelector'])); //забираем массив всех полей текущей формы
  const buttonElement = formElement.querySelector(validationConfig['submitButtonSelector']); //забираем кнопку текущего попапа
  toggleButtonState(inputList, buttonElement, validationConfig); //переключаем класс кнопки на неактивный
  inputList.forEach((inputElement) => { //для каждого поля формы
    inputElement.addEventListener('input', function () { //добавляем слушатель изменения поля, по которому
      toggleButtonState(inputList, buttonElement, validationConfig); // запускается функция изменения клаасса кнопки на активный
      checkInputValidity(formElement, inputElement, validationConfig); //запускается валидация измененного поля
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig['formSelector'])); //забираем массив форм
  formList.forEach((formElement) => { //для каждой формы 
    formElement.addEventListener('submit', function (evt) { //вешаем слушатель, который при отправке формы
      evt.preventDefault(); //отменяет стандартное поведение
    });
    setEventListeners(formElement, validationConfig); //запускаем для формы функцию, которая реагирует на изменение полей формы
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => { //верни true, если в списке полей 
    return !inputElement.validity.valid; //есть поле, которое не прошло валидацию
  })
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {   //если проверка валидации вернула true
    buttonElement.classList.add(validationConfig['inactiveButtonClass']); //добавляем кнопке класс, который делает ее неактивной
  } else 
  buttonElement.classList.remove(validationConfig['inactiveButtonClass']); //иначе убираем класс, который делает кнопку неактивной
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig['inputSelector'])); //забираем массив полей текущей формы
  inputList.forEach((inputElement) => { //для каждого поля из массива
    hideInputError(formElement, inputElement, validationConfig); //вызываем функцию скрытия ошибок
  });
  const buttonElement = formElement.querySelector(validationConfig['submitButtonSelector']); //забираем кнопку текущей формы
  buttonElement.classList.add(validationConfig['inactiveButtonClass']); //добавляем кнопке класс, который делает ее неактивной
}

export { clearValidation, enableValidation } //экспортируем функции очищения ошибок и дезактивации кнопки, запуска валидации