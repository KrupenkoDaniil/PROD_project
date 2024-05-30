import { createTemplate } from './templates.js';
import * as utils from './utils.js';

export function inputValidityListener(event) {
    const input = event.target
    if (input.value !== '') {
        input.setCustomValidity('')
        input.reportValidity();
    }
}

export function oneInputAddButtonListener(event) {
    const section = event.target.parentElement;
    const input = section.querySelector('input');
    const list = section.parentElement.querySelector('ul');

    if (input.value == '') {
        input.setCustomValidity('Введите какой-нибудь свой инетерс')
        input.reportValidity();
        return
    }
    const element = createTemplate(section.parentElement.getAttribute('id'), input.value);
    list.insertAdjacentHTML('beforeend', element);
    input.value = '';
}

export function manyInputAddButtonListener(event) {
    const section = event.target.parentElement;
    const inputs = section.querySelectorAll('input');
    const list = section.parentElement.querySelector('ul');
    const elementDetails = [];
    for (let input of inputs) {
        if (input.value == '' && input.hasAttribute('required')) {
            input.setCustomValidity('Заполните это поле');
            input.reportValidity();
            return
        }
        elementDetails.push(input.value)
    }  
    const element = createTemplate(section.parentElement.getAttribute('id'), elementDetails);
    list.insertAdjacentHTML('beforeend', element);
    inputs.forEach((input) => {
        input.value = '';
    })

}

export function deleteButtonListener(event) {
    const section = event.target.parentElement.parentElement;
    const elements = section.querySelectorAll('li');
    if (elements.length) {
        elements[elements.length-1].remove()
    }
}

export function generateButtonListener(event) {
    const formSection = document.querySelector('.resume-form');
    formSection.style.left = '-50%';
    event.target.style.visibility = 'hidden';

    const formData = utils.getFormData(event.target.parentElement);
    utils.checkEmptiness(formData);
    formData['jobExps'] = utils.sortByDate(formData['jobExps']); 
    formData['education'] = utils.sortByDate(formData['education']); 
    formData['courses'] = utils.sortByDate(formData['courses']); 
    utils.modifyDateFormat(formData);
    utils.setResumeData(formData);
}

export function backButtonListener(event) {
    event.preventDefault();
    const formSection = document.querySelector('.resume-form');
    const generateButton = document.querySelector('#form-generate-button');
    formSection.style.left = '50%';
    generateButton.style.visibility = 'visible';
}

export function saveButtonListener() {
    const formSection = document.querySelector('.resume-form');
    const formData = utils.getFormData(formSection.querySelector('.resume-form__form'));
    const storedResumesJson = localStorage.getItem('resumes');
    if (storedResumesJson != null) {

        if(localStorage.getItem('modifiedResumeId') == null) {
            const storedResumes = JSON.parse(storedResumesJson);
            storedResumes.unshift(formData)
            localStorage.setItem('resumes', JSON.stringify(storedResumes));
        } else {
            const modifyingResumeId = JSON.parse(localStorage.getItem('modifiedResumeId'));
            const resumesList = JSON.parse(localStorage.getItem('resumes'));
            resumesList[modifyingResumeId] = formData;
            localStorage.setItem('resumes', JSON.stringify(resumesList));
            localStorage.removeItem('modifiedResumeId');
            console.log(resumesList);
        }
    } else {
       localStorage.setItem('resumes', JSON.stringify([formData])); 
    }
}

export function actionButtonListener(event) {
    const openButton = event.target.nextElementSibling;
    const deleteButton = openButton.nextElementSibling;
    const copyButton = deleteButton.nextElementSibling;
    event.target.style.display = 'none';
    openButton.style.display = 'inline';
    deleteButton.style.display = 'inline';
    copyButton.style.display = 'inline';

    openButton.addEventListener('click', openResumeButtonListener);
    deleteButton.addEventListener('click', deleteResumeButtonListener);
    copyButton.addEventListener('click', copyResumeButtonListener);
}

function openResumeButtonListener(event) {
    const targetResumeElement = event.target.parentElement.parentElement;
    const resumeListElement = targetResumeElement.parentElement;
    let nth = -1;
    resumeListElement.querySelectorAll('li').forEach((element, id) => {
        if (targetResumeElement == element) nth = id;
    });
    const resumesList = JSON.parse(localStorage.getItem('resumes'));
    localStorage.setItem('modifiedResumeId', nth);
}

function deleteResumeButtonListener(event) {
    const targetResumeElement = event.target.parentElement.parentElement;
    const resumeListElement = targetResumeElement.parentElement;
    let nth = -1;
    resumeListElement.querySelectorAll('li').forEach((element, id) => {
        if (targetResumeElement == element) nth = id;
    });
    const resumeList = JSON.parse(localStorage.getItem('resumes'));
    if (resumeListElement.length == 1) {
        resumeList.pop()
    } else {
        resumeList.splice(nth, 1);
        localStorage.setItem('resumes', JSON.stringify(resumeList));
    }
    targetResumeElement.remove();
}

function copyResumeButtonListener(event) {
    const modalWindows = document.querySelector('.modal-window');
    modalWindows.style.top = '50%';
    modalWindows.querySelector('#modal-cancel-button').style.visibility = 'visible';
    const targetResumeElement = event.target.parentElement.parentElement;
    const resumeListElement = event.target.parentElement.parentElement.parentElement;
    let nth = -1;
    resumeListElement.querySelectorAll('li').forEach((element, id) => {
        if (targetResumeElement == element) nth = id;
    });

    localStorage.setItem('copyResumeId', nth);
}

export function copyButtonListener(event) {
    const checkedBoxes = event.target.parentElement.querySelectorAll('input[type="checkbox"]:checked');
    const nth = localStorage.getItem('copyResumeId');
    
    const targetResumeObj = JSON.parse(localStorage.getItem('resumes'))[nth];
    const resumeToCopy = {};
    
    resumeToCopy['title'] = targetResumeObj['title'];
    resumeToCopy['fullName'] = targetResumeObj['fullName'];
    checkedBoxes.forEach((checkbox) => {
        if (checkbox.getAttribute('id') == 'modal-personal-info') {
            resumeToCopy['birthDate'] = targetResumeObj['birthDate'];
            resumeToCopy['city'] = targetResumeObj['city'];
            resumeToCopy['telephone'] = targetResumeObj['telephone'];
            resumeToCopy['email'] = targetResumeObj['email'];
        }
        if (checkbox.getAttribute('id') == 'modal-description') {
            resumeToCopy['description'] = targetResumeObj['description'];
        }
        if (checkbox.getAttribute('id') == 'modal-interests') {
            resumeToCopy['interests'] = targetResumeObj['interests'];
        }
        if (checkbox.getAttribute('id') == 'modal-languages') {
            resumeToCopy['languages'] = targetResumeObj['languages'];
        }
        if (checkbox.getAttribute('id') == 'modal-jobs') {
            resumeToCopy['jobExps'] = targetResumeObj['jobExps'];
        }
        if (checkbox.getAttribute('id') == 'modal-educations') {
            resumeToCopy['educations'] = targetResumeObj['educations'];
        }
        if (checkbox.getAttribute('id') == 'modal-courses') {
            resumeToCopy['courses'] = targetResumeObj['courses'];
        }
    });
    localStorage.setItem('resumeToCopy', JSON.stringify(resumeToCopy));
}

export function deleteAllButtonListener(event) {
    const checkedResumes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedResumes.forEach((checked) => {
        checked.parentElement.querySelector('#action-button').click();
        checked.parentElement.querySelector('#delete-button').click();
    })
}