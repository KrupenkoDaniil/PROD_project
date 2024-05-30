import * as eventListeners from './eventListeners.js';
import * as utils from './utils.js';

const fullNameInput = document.querySelector('#input-full-name');
const generateButton = document.querySelector('.resume-form__generate-button');
const backButton = document.querySelector('.resume-preview__back-button');
const saveButton = document.querySelector('.resume-preview__save-button');

fullNameInput.addEventListener('input', utils.fullNameInputCheck);
generateButton.addEventListener('click', eventListeners.generateButtonListener);
backButton.addEventListener('click', eventListeners.backButtonListener);
saveButton.addEventListener('click', eventListeners.saveButtonListener);

const manyInputSections = document.querySelectorAll('.many-input-section');
manyInputSections.forEach((section) => {
    const inputs = section.querySelectorAll('input');
    const [deleteButton, addButton] = section.querySelectorAll('button');

    inputs.forEach((input) => {
        input.addEventListener('input', eventListeners.inputValidityListener);
    })

    if (inputs.length == 1) {
        addButton.addEventListener('click', eventListeners.oneInputAddButtonListener);
    } else {
        addButton.addEventListener('click', eventListeners.manyInputAddButtonListener);
    }
    
    deleteButton.addEventListener('click', eventListeners.deleteButtonListener);
});

if (localStorage.getItem('modifiedResumeId') != null) {
    const modifyingResumeId = JSON.parse(localStorage.getItem('modifiedResumeId'));
    const modifyingResume = JSON.parse(localStorage.getItem('resumes'))[modifyingResumeId];
    utils.setModifyingForm(modifyingResume);
}

if (localStorage.getItem('resumeToCopy') != null) {
    const modifyingResume = JSON.parse(localStorage.getItem('resumeToCopy'));
    utils.setModifyingForm(modifyingResume);
}

if(fullNameInput.value.trimStart().trimEnd().split(' ').length == 3) generateButton.disabled = false; 

