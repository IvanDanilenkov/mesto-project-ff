function checkInputValidity(form, input, config) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  const patternErrorMessage = input.dataset.patternErrorMessage;

  if (patternErrorMessage && input.value !== '' && !regex.test(input.value)) {
    input.setCustomValidity(patternErrorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

function showInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function hasInvalidInput(inputs) {
  return inputs.some(input => !input.validity.valid);
}

function toggleButtonState(inputs, button, config) {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, button, config);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(form, config);
  });
}