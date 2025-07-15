// Функция по обработке любых ошибок, связанных с API-запросами
export function handleApiError (error, context = 'Ошибка API') {
  console.error(`${context}:`, error);
  alert(`${context}: ${error.message || 'Что-то пошло не так'}`);
}

// Функция уведомления о статусе загрузки
export function renderLoading (isLoading, button, defaultText = 'Сохранить') {
  button.textContent = isLoading ? 'Сохранение...' : defaultText;
}