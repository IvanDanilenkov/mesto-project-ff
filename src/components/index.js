import { initialCards } from "./cards.js";
import { createCard } from './card.js';
import { openModal, closeModal } from "./modal.js";
import '../pages/index.css';

// Добавление анимационного класса всем попапам
document.querySelectorAll('.popup').forEach(popup => {
  popup.classList.add('popup_is-animated');
})

// Контейнер для карточек
const cardsContainer = document.querySelector('.places__list');

// Попап редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Элементы профиля на странице
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Попап добавления карточки
const newPlacePopup = document.querySelector('.popup_type_new-card');
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = addCardForm.querySelector('.popup__input_type_url');

// Попап просмотра изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');

// Открытие попапа редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
  openModal(editProfilePopup);
})

// Открытие попапа добавления карточки
addButton.addEventListener('click', () => openModal(newPlacePopup));

// Открытие попапа на изображении
function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

// Закрытие попапов
closeButtons.forEach(button => {
  button.addEventListener('click', evt => {
  const popup = evt.target.closest('.popup');
  
  closeModal(popup);
  });
});

// Удаление карточки
 function deleteCard(cardElement) {
  cardElement.remove();
}

// Создание стартовых карточек
initialCards.forEach((element) => {
  const card = createCard(element, deleteCard, handleImageClick, handleLikeCard);
  cardsContainer.append(card);
})

// Обновление данных профиля при отправке формы
formElement.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(editProfilePopup);
})

// Добавление новой карточки из формы
addCardForm.addEventListener('submit', function handleAddCardSubmit (evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const newCard = createCard({ name, link }, deleteCard, handleImageClick, handleLikeCard);
  cardsContainer.prepend(newCard);

  closeModal(newPlacePopup);
  addCardForm.reset();
})

// Обработка лайка карточки
  function handleLikeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }