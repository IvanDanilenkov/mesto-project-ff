const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard({ name, link }, handleDeleteCard, handleImageClick) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  title.textContent = name;
  image.alt = name;
  image.src = link;
  
  deleteButton.addEventListener('click', () => {
    handleDeleteCard(cardElement);
  });

  likeButton.addEventListener('click', () => {
    handleLikeCard(likeButton);
  });

  image.addEventListener('click', () => {
    handleImageClick(name, link);
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