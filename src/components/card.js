const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard({ name, link }, deleteCard, imageClick, likeCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  title.textContent = name;
  image.alt = name;
  image.src = link;
  
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeCard(cardElement, likeButton);
  });

  image.addEventListener('click', () => {
    imageClick(name, link);
  });

  return cardElement;
}