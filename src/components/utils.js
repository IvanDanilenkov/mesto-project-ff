export function handleApiError (error, context = 'Ошибка API') {
  console.error(`${context}:`, error);
  alert(`${context}: ${error.message || 'Что-то пошло не так'}`);
}