import * as eventListeners from './eventListeners.js';
import { createResumeItemTemplate } from './templates.js';

const resumesJson = localStorage.getItem('resumes');
const resumesList = resumesJson != 'undefined' ? JSON.parse(resumesJson) : null;
const listElement = document.querySelector('.resume-list__list');

resumesList?.forEach((resume) => {
    const newResumeItem = createResumeItemTemplate(resume['title'] || resume['fullName']);
    listElement.insertAdjacentHTML('beforeend', newResumeItem);
});

const actionButton = document.querySelectorAll('#action-button');
actionButton.forEach(button => {
    button.addEventListener('click', eventListeners.actionButtonListener);
})

const modalWindows = document.querySelector('.modal-window');
const copyButton = modalWindows.querySelector('#modal-copy-button');
const cancelButton = modalWindows.querySelector('#modal-cancel-button');
copyButton.addEventListener('click', eventListeners.copyButtonListener);
cancelButton.addEventListener('click', (event) => {
    event.target.parentElement.style.top = '-50%';
    event.target.parentElement.querySelectorAll('input[type="checkbox"]:checked').forEach((checked) => {
        checked.checked = false;
    });
    localStorage.removeItem('copyResumeId');
    event.target.style.visibility = 'hidden';
})

const deleteAllButton = document.querySelector('#delete-all-button');
deleteAllButton.addEventListener('click', eventListeners.deleteAllButtonListener);