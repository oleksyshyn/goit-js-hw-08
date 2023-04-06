import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const formData = {};
const DATA_KEY = 'feedback-form-state';
    
populateForm();
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(DATA_KEY);
    console.log(formData);
}

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(DATA_KEY, JSON.stringify(formData));
}

function populateForm() {
    const savedData = localStorage.getItem(DATA_KEY);
    const savedDataJSON = JSON.parse(savedData);
    if (savedData) {
        form.email.value = savedDataJSON.email;
        form.message.value = savedDataJSON.message;
    }
}