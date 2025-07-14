import { toggleLike, deleteCardRequest } from "./api.js";
import { handleApiError } from './utils.js';

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, handleDeleteCard, handleImageClick, userId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__like-count");

  title.textContent = cardData.name;
  image.alt = cardData.name;
  image.src = cardData.link;

  // Установить лайки и активное состояние при создании карточки
  updateLikeState(likeButton, likesCounter, cardData.likes, userId);

  // Если карточка чужая — скрываем кнопку удаления
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      handleDeleteCard(cardElement, cardData._id);
    });
  }

  // Обработка клика по лайку
  likeButton.addEventListener('click', () => {
    const isLike = likeButton.classList.contains('card__like-button_is-active');

    toggleLike(cardData._id, isLike)
      .then((updatedCard) => {
        updateLikeState(likeButton, likesCounter, updatedCard.likes, userId);
      })
      .catch((err) => handleApiError(err, 'Ошибка обновления лайка'));
  });

  // Открытие полноразмерного изображения
  image.addEventListener('click', () => {
    handleImageClick(cardData.name, cardData.link);
  });

  return cardElement;
}

// Удаление карточки
export function deleteCard(cardElement, cardId) {
  deleteCardRequest(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => handleApiError(err, 'Ошибка удаления карточки'));
}

// Отображение количества лайков и состояния кнопки
function updateLikeState(likeButton, likesCounter, likesArray, userId) {
  const isLikedNow = likesArray.some(user => user._id === userId);

  likeButton.classList.toggle('card__like-button_is-active', isLikedNow);
  likesCounter.textContent = likesArray.length;
}
