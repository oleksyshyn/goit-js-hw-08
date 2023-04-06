import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const DATA_KEY = 'feedback-form-state';
    
populateForm();
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(DATA_KEY)));
    localStorage.removeItem(DATA_KEY);
}

function onFormInput(event) {
    const formData = {
        email: input.value,
        message: textarea.value,
    };
    localStorage.setItem(DATA_KEY, JSON.stringify(formData));
}

function populateForm() {
    const savedData = localStorage.getItem(DATA_KEY);
    const savedDataJSON = JSON.parse(savedData);
    if (savedData) {
        input.value = savedDataJSON.email;
        textarea.value = savedDataJSON.message;
    }
}