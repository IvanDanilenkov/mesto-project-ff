export function getUserInfo () {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-42/users/me', {
    headers: {
      authorization: '0f821d11-a105-48a3-bfde-fe7dabbb61c0'
    }
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}