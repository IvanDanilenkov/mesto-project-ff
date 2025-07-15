const baseUrl = 'https://mesto.nomoreparties.co/v1/wff-cohort-42';
const token = '0f821d11-a105-48a3-bfde-fe7dabbb61c0';
const headers = {
  authorization: token,
  'Content-Type': 'application/json'
};

// Общая функция для проверки ответов от сервера
function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return res.json().then((error) => {
    error.httpResponseCode = res.status;
    return Promise.reject(error);
  });
}

export function getUserInfo () {
  return fetch(`${baseUrl}/users/me`, {
    headers
  })
  .then(checkResponse);
}

export function getInitialCards () {
  return fetch(`${baseUrl}/cards`, {
    headers
  })
  .then(checkResponse);
}

export function updateUserProfile(name, about) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ name, about })
  })
  .then(checkResponse);
}
  

export function addNewCard(name, link) {
  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, link, })
  })
  .then(checkResponse);
}

export function deleteCardRequest (cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers
  })
  .then(checkResponse);
}

export function toggleLike(cardId, isLiked) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers,
  })
  .then(checkResponse);
}

export function updateUserAvatar (avatar) {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ avatar })
  })
  .then(checkResponse);
}