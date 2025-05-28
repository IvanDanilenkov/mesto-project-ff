// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard({ name, link }, deleteCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  title.textContent = name;
  image.alt = name;
  image.src = link;
  
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
};

// @todo: Функция удаления карточки
 function deleteCard (cardElement) {
  cardElement.remove();
}; 

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = createCard(element, deleteCard);
  cardsContainer.append(card);
});