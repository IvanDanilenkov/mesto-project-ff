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

// Универсальная функция запроса: обертка над fetch
function request (endPoint, options = {}) {
  return fetch(baseUrl + endPoint, options)
  .then(checkResponse);
}

export function getUserInfo () {
  return request('/users/me');
}

export function getInitialCards () {
  return request('/cards');
}

export function updateUserProfile(name, about) {
  return request('/users/me', {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ name, about })
  });
}

export function addNewCard(name, link) {
  return request('/cards', {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, link, })
  });
}

export function deleteCardRequest (cardId) {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers
  });
}
  
export function toggleLike(cardId, isLiked) {
  return request(`/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers, 
  });
}

export function updateUserAvatar (avatar) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ avatar })
  });
}