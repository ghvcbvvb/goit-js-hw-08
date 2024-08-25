import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

loadFormData();

form.addEventListener('input', throttle(saveFormData, 500));
form.addEventListener('submit', onSubmitForm);

function saveFormData() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    emailInput.value = email || '';
    messageInput.value = message || '';
  }
}

function onSubmitForm(event) {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  console.log('Submitted form data:', formData);
}

