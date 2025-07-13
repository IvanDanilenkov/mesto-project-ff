import '../pages/index.css';
import { createCard, deleteCard, handleLikeCard } from './card.js';
import { openModal, closeModal } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import { getUserInfo, getInitialCards, updateUserProfile, addNewCard } from "./api.js";

// Добавление анимационного класса всем попапам
document.querySelectorAll('.popup').forEach(popup => {
  popup.classList.add('popup_is-animated');
})

// Контейнер для карточек
const cardsContainer = document.querySelector('.places__list');

// Попап редактирования профиля и его элементы
const popupProfile = document.querySelector('.popup_type_edit');
const formProfile = document.querySelector('.popup__form[name="edit-profile"]');
const inputProfileName = formProfile.querySelector('.popup__input_type_name');
const inputProfileJob = formProfile.querySelector('.popup__input_type_description');

// Элементы профиля на странице
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
let userId = '';

// Попап добавления карточки и его элементы
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const formAddNewCard = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = formAddNewCard.querySelector('.popup__input_type_card-name');
const placeLinkInput = formAddNewCard.querySelector('.popup__input_type_url');

// Попап просмотра изображения и его элементы
const popupFullImage = document.querySelector('.popup_type_image');
const imageFull = document.querySelector('.popup__image');
const captionFull = document.querySelector('.popup__caption');

// Кнопки открытия попапов
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');

// Конфиги валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Кнопки закрытия всех попапов
const popupCloseButtons = document.querySelectorAll('.popup__close');

// Открытие попапа с полной картинкой
function handleCardImageClick(name, link) {
  imageFull.src = link;
  imageFull.alt = name;
  captionFull.textContent = name;
  openModal(popupFullImage);
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = inputProfileName.value;
  const about = inputProfileJob.value;

  updateUserProfile(name, about)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(popupProfile);
  })
  .catch((err) => {
    console.error('Ошибка при обновлении профиля:', err)
  });
}

// Обработчик отправки формы добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  addNewCard(name, link)
  .then((data) => {
  const newCard = createCard(data, deleteCard, handleCardImageClick, handleLikeCard, userId);
  cardsContainer.prepend(newCard);
  closeModal(popupAddNewCard);
  formAddNewCard.reset();
  })
  .catch((err) => {
    console.error('Ошибка при добавления новой карточки:', err)
  });
}

// Открытие попапа редактирования профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  inputProfileName.value = profileTitle.textContent;
  inputProfileJob.value = profileDescription.textContent;
  clearValidation (formProfile, validationConfig);
  openModal(popupProfile);
})

// Открытие попапа добавления карточки
buttonOpenPopupAddNewCard.addEventListener('click', () => {
  formAddNewCard.reset();
  clearValidation(formAddNewCard, validationConfig);
  openModal(popupAddNewCard)});

// Закрытие попапов по кнопкам закрытия
popupCloseButtons.forEach(button => {
  button.addEventListener('click', evt => {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
  })
})

// Отправка формы редактирования профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

// Отправка формы добавления новой карточки
formAddNewCard.addEventListener('submit', handleAddCardFormSubmit);

// Запуск валидации
enableValidation(validationConfig);

// Получение данных профиля и карточек 
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    userId = userData._id;

    cards.forEach((cardsData) => {
      const card = createCard(cardsData, deleteCard, handleCardImageClick, handleLikeCard, userId)
      cardsContainer.append(card);
    });
  })
  .catch((error) => {
    console.error('Ошибка при получении данных:', error);
  })