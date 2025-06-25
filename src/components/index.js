import { initialCards } from "./cards.js";
import { createCard } from './card.js';
import { openModal, closeModal } from "./modal.js";
import '../pages/index.css';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

// DOM-элементы для профиля
const editProfilePopup = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// DOM-элементы текущего профиля на странице
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// DOM-элементы для добавления новой карточки
const newPlacePopup = document.querySelector('.popup_type_new-card');
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = addCardForm.querySelector('.popup__input_type_url');

// DOM-элементы для изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Обработчики событий (открытие попапа)
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
  openModal(editProfilePopup);
})

addButton.addEventListener('click', () => openModal(newPlacePopup));

// Обработчики событий (закрытие попапа)
document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup__close')) {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
  }
})

// Функция удаления карточки
 function deleteCard (cardElement) {
  cardElement.remove();
}

// Открытие попапа на изображении
function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

// Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = createCard(element, deleteCard, handleImageClick, handleLikeCard);
  cardsContainer.append(card);
})

// Обработчик обновления профиля
formElement.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(editProfilePopup);
})

// Обработчик добавления новой карточки
addCardForm.addEventListener('submit', function handleAddCardSubmit (evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const newCard = createCard({ name, link }, deleteCard, handleImageClick, handleLikeCard);
  cardsContainer.prepend(newCard);

  closeModal(newPlacePopup);
  addCardForm.reset();
})

// Лайк карточки 
  function handleLikeCard (cardElement, likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }