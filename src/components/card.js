const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, handleDeleteCard, handleImageClick, userId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  title.textContent = cardData.name;
  image.alt = cardData.name;
  image.src = cardData.link;
  
  // Обработка лайка
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработка удаления — только если карточка твоя
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', () => {
    handleDeleteCard(cardElement, cardData._id);
  });

  likeButton.addEventListener('click', () => {
    handleLikeCard(likeButton, cardData._id);
  });

  image.addEventListener('click', () => {
    handleImageClick(cardData.name, cardData.link);
  });

  return cardElement;
}

// Удаление карточки
 export function deleteCard(cardElement) {
  cardElement.remove();
}

// Обработка лайка карточки
 export function handleLikeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }