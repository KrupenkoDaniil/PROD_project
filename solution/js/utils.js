import { createTemplate, createSectionTemplate } from './templates.js';
import { generateButtonListener } from './eventListeners.js';

export function fullNameInputCheck(event) {
    const generateButton = document.querySelector('#form-generate-button');
    const backButton = document.querySelector('#preview-back-button')
    const fullNameElements = event.target.value.trimStart().trimEnd().split(' ');
    if (fullNameElements.length == 3) {
        generateButton.disabled = false;
        backButton.style.visibility = 'visible';
    } else {
        generateButton.disabled = true;
        backButton.style.visibility = 'hidden';
    }
}

export function getFormData(formSection) {
    const interestsSection = formSection.querySelector('#input-interests');
    const languagesSection = formSection.querySelector('#input-languages');
    const descriptionSection = formSection.querySelector('#input-description');
    const jobExperienceSection = formSection.querySelector('#input-jobs');
    const educationSection = formSection.querySelector('#input-educations');
    const coursesSection = formSection.querySelector('#input-courses');
    return {
        title: formSection.querySelector('#input-title').value,
        fullName: formSection.querySelector('#input-full-name').value,
        birthDate: formSection.querySelector('#input-birth-date').value,
        city: formSection.querySelector('#input-city').value,
        telephone: formSection.querySelector('#input-telephone').value,
        email: formSection.querySelector('#input-email').value,
        interests: [...interestsSection.querySelectorAll('input')].map(interest => interest.value),
        languages: [languagesSection.querySelector('.resume-form__label'),...languagesSection.querySelectorAll('li')].map((item) => {
            return {
                language: item.querySelectorAll('input')[0].value,
                level: item.querySelectorAll('input')[1].value
            }}),
        description: descriptionSection.querySelector('textarea').value,
        jobExps: [...jobExperienceSection.querySelectorAll('.many-input-section__inputs')].map((item) => {
            return {
                title: item.querySelectorAll('.many-input-section__input')[0].value,
                startDate: item.querySelectorAll('.many-input-section__input')[1].value,
                endDate: item.querySelectorAll('.many-input-section__input')[2].value,
                place: item.querySelectorAll('.many-input-section__input')[3].value,
                description: item.querySelectorAll('.many-input-section__input')[4].value,
            }}),
        educations: [...educationSection.querySelectorAll('.many-input-section__inputs')].map((item) => {
            return {
                title: item.querySelectorAll('.many-input-section__input')[0].value,
                startDate: item.querySelectorAll('.many-input-section__input')[1].value,
                endDate: item.querySelectorAll('.many-input-section__input')[2].value,
                place: item.querySelectorAll('.many-input-section__input')[3].value,
                description: item.querySelectorAll('.many-input-section__input')[4].value,
            }}),
        courses: [...coursesSection.querySelectorAll('.many-input-section__inputs')].map((item) => {
            return {
                title: item.querySelectorAll('.many-input-section__input')[0].value,
                startDate: item.querySelectorAll('.many-input-section__input')[1].value,
                endDate: item.querySelectorAll('.many-input-section__input')[2].value,
                place: item.querySelectorAll('.many-input-section__input')[3].value,
            }}), 
        }
}

export function checkEmptiness(formData) {
    for (const dataName in formData) {
        const newData = []
        if (dataName == 'interests') {
            formData[dataName].forEach((interest) => {
                if (interest != '') newData.push(interest)
            })
            formData[dataName] = newData;
        }
        if (dataName == 'languages') {
            for (const element in formData[dataName]) {
                if (formData[dataName][element]['language'] != '' && formData[dataName][element]['level'] != '') newData.unshift(formData[dataName][element])
            }
            formData[dataName] = newData;
        }
        if (dataName == 'jobExps' || dataName == 'educations' || dataName == 'courses') {
            for (const element in formData[dataName]) {
                if (formData[dataName][element]['title'] != '') newData.unshift(formData[dataName][element])
            }
            formData[dataName] = newData;
        }
    }
}

export function sortByDate(listToSort) {
    if (listToSort == undefined) {
        return listToSort
    }

    const sortable = [];
    for (let element of listToSort) {
        const sortable2 = []
        for (let obj in element) {
            sortable2.push([obj, element[obj]]);
        }
        sortable.push(sortable2)
    }

    sortable.sort(function(a, b) {
        return new Date(b[1][1]) - new Date(a[1][1]);
    });

    const result = [];
    sortable.forEach((array) => {
        result.push(Object.fromEntries(array))
    })
    return result
}

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

  
    return date.toLocaleString('ru-RU', {
      month: 'long',
    });
  }

export function modifyDateFormat(formDate) {
    // название_месяца год г.

    for (let key in formDate) {
        if (key == 'jobExps' || key == 'educations' || key == 'courses') {
            formDate[key].forEach((item) => {
                const oldStartDateSplited = item['startDate'].split('-');
                const oldEndDateSplited = item['endDate'].split('-');
                if (oldStartDateSplited != '') {
                    const newStartDate = getMonthName(oldStartDateSplited[1]) + ' ' + oldStartDateSplited[0] + ' г.';
                    item['startDate'] = newStartDate;
                }
                if (oldEndDateSplited != '') {
                    const newEndDate = getMonthName(oldEndDateSplited[1]) + ' ' + oldEndDateSplited[0] + ' г.'
                    item['endDate'] = newEndDate;
                }
            })
        }
    }
}

export function setResumeData(formData) {

    createSections(formData);
    const personalInfoSection = document.querySelector('#personal-info-section');

    const fullNameSeciton = personalInfoSection.querySelector('#full-name').parentElement;
    const rightSectionHeader = document.querySelector('.right-section__header').parentElement;
    setOneElementSection(fullNameSeciton, formData['fullName']);
    setOneElementSection(rightSectionHeader, formData['fullName']);

    const birthDateSeciton = personalInfoSection.querySelector('#birth-date').parentElement;
    setOneElementSection(birthDateSeciton, formData['birthDate']);
    
    const citySeciton = personalInfoSection.querySelector('#city').parentElement;
    setOneElementSection(citySeciton, formData['city']);

    const telephoneSeciton = personalInfoSection.querySelector('#telephone').parentElement;
    setOneElementSection(telephoneSeciton, formData['telephone']);

    const emailSeciton = personalInfoSection.querySelector('#email').parentElement;
    setOneElementSection(emailSeciton, formData['email']);

    const interestsSection = document.querySelector('#interests-section');
    setOneElementSection(interestsSection, formData['interests']);

    const languagesSection = document.querySelector('#languages-section');
    setManyElementsSection(languagesSection, formData['languages']);

    const descriptionSection = document.querySelector('#description-section');
    descriptionSection.innerText = formData['description'];

    const jobExperienceSection = document.querySelector('#job-experience-section');
    setManyElementsSection(jobExperienceSection, formData['jobExps']);

    const educationSection = document.querySelector('#education-section');
    setManyElementsSection(educationSection, formData['educations']);

    const coursesSection = document.querySelector('#courses-section');
    setManyElementsSection(coursesSection, formData['courses']);
}

function createSections(formData) {
    const leftSection = document.querySelector('.left-section');
    const rightSection = document.querySelector('.right-section');
    if (formData['interests'].length > 0 && !leftSection.querySelector('#interests-section')) {
        const interestsSection = createSectionTemplate('Интересы', 'left', 'interests-section');
        leftSection.insertAdjacentHTML('beforeend', interestsSection);
    }
    if (formData['languages'].length > 0 && !leftSection.querySelector('#languages-section')) {
        const languagesSection = createSectionTemplate('Языки', 'left', 'languages-section');
        leftSection.insertAdjacentHTML('beforeend', languagesSection);
    }
    if (formData['jobExps'].length > 0 && !rightSection.querySelector('#job-experience-section')) {
        const jobExpSection = createSectionTemplate('Опыт работы', 'right', 'job-experience-section');
        rightSection.insertAdjacentHTML('beforeend', jobExpSection);
    }
    if (formData['educations'].length > 0 && !rightSection.querySelector('#education-section')) {
        const educationSection = createSectionTemplate('Образование и квалификация', 'right', 'education-section');
        rightSection.insertAdjacentHTML('beforeend', educationSection);
    }
    if (formData['courses'].length > 0 && !rightSection.querySelector('#courses-section')) {
        const coursesSection = createSectionTemplate('Курсы', 'right', 'courses-section');
        rightSection.insertAdjacentHTML('beforeend', coursesSection);
    }
}

function setOneElementSection(sectionElement, elementArray) {
    if (elementArray.lenght == 0 || elementArray == '') {
        const mainSection = sectionElement?.parentElement.parentElement;
        if (mainSection?.getAttribute('id') == 'personal-info-section') {
            sectionElement.style.display = 'none';

        } else {
            sectionElement ? sectionElement.remove() : null; 
        }
        return
    } 
    if(typeof elementArray == "string") {
        sectionElement.style.display = 'inherit';
        const mutableElement = sectionElement.querySelector('h1') || sectionElement.querySelector('a') || sectionElement.querySelector('p');
        if (mutableElement.getAttribute('id') == 'birth-date') {
            elementArray = elementArray.split('-').reverse().join('.');
        }
        mutableElement.innerText = elementArray;
        return
    } 
    sectionElement.style.display = 'inherit';
    const listContainer = sectionElement.querySelector('ul');
    listContainer.innerHTML = '';
    elementArray.forEach((item) => {
        const element = createTemplate(sectionElement.getAttribute('id'), [item]);
        listContainer.insertAdjacentHTML('beforeend', element);
    })
}

function setManyElementsSection(sectionElement, elementsArray) {
    if (elementsArray.length == 0) {
        const mainSection = sectionElement?.parentElement.parentElement;
        if (mainSection?.getAttribute('id') == 'personal-info-section') {
            sectionElement.style.display = 'none';

        } else {
            sectionElement ? sectionElement.remove() : null; 
        }
        return
    }
    sectionElement.style.display = 'inherit';
    const listContainer = sectionElement.querySelector('ul');
    listContainer.innerHTML = '';
    sectionElement.style.display = 'inherit';
    elementsArray.forEach((item) => {
        const element = createTemplate(sectionElement.getAttribute('id'), Object.values(item));
        listContainer.insertAdjacentHTML('beforeend', element);
    })
}

export function setModifyingForm(modifyingResume) {
    
    const formSection = document.querySelector('.resume-form__form');

    const titleInput = formSection.querySelector('#input-title');
    titleInput.value = modifyingResume['title'];

    const fullNameInput = formSection.querySelector('#input-full-name');
    fullNameInput.value = modifyingResume['fullName'];

    const birthDateInput = formSection.querySelector('#input-birth-date');
    birthDateInput.value = modifyingResume['birthDate'] || '';
    
    const cityInput = formSection.querySelector('#input-city');
    cityInput.value = modifyingResume['city'] || '';
    
    const telephoneInput = formSection.querySelector('#input-telephone');
    telephoneInput.value = modifyingResume['telephone'] || '';
    
    const emailInput = formSection.querySelector('#input-email');
    emailInput.value = modifyingResume['email'] || '';

    const interestsSection = formSection.querySelector('#input-interests');
    const interestsInput = interestsSection.querySelector('.many-input-section__input');
    const addInterestButton = interestsSection.querySelector('.many-input-section__add-button');
    modifyingResume['interests']?.forEach((interest) => {
        addInterestButton.click();
        interestsInput.value = interest;
    })

    const languagesSection = formSection.querySelector('#input-languages');
    setManyInputs(languagesSection, modifyingResume['languages']);

    const descriptionInput = formSection.querySelector('#textarea-description');
    descriptionInput.value = modifyingResume['description'] || '';
    
    const jobExpsSection = formSection.querySelector('#input-jobs');
    setManyInputs(jobExpsSection, modifyingResume['jobExps']);

    const educationsSection = formSection.querySelector('#input-educations');
    setManyInputs(educationsSection, modifyingResume['educations']);
    
    const coursesSection = formSection.querySelector('#input-courses');
    setManyInputs(coursesSection, modifyingResume['courses']);

    const backButton = document.querySelector('#preview-back-button');
    generateButtonListener({target: document.querySelector('#form-generate-button')});
    backButton.style.visibility = 'visible';
}

function setManyInputs(section, dataList) {
    const inputs = section.querySelectorAll('.many-input-section__input');
    const addButton = section.querySelector('.many-input-section__add-button');

    dataList?.forEach((language) => {
        const langValues = Object.values(language);
        inputs.forEach((input, id) => {
            addButton.click();
            input.value = langValues[id];
        });
    });
}