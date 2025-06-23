import { initialCards } from "./cards.js";
import { createCard } from './card.js';
import { openModal, closeModal } from "./modal.js";
import '../pages/index.css';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

const editProfilePopup = document.querySelector('.popup_type_edit');
const newPlacePopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Обработчики событий (открытие попапа)
editButton.addEventListener('click', () => openModal(editProfilePopup));
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
  const card = createCard(element, deleteCard, handleImageClick);
  cardsContainer.append(card);
})