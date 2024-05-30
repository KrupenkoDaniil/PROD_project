export function createTemplate(id, details) {
    switch (id) {
        case 'input-interests': {
            return createFormInterestTemplate(details)
        }
        case 'input-languages': {
            return createFormLanguageTemplate(...details)
        }
        case 'input-jobs':
        case 'input-educations': {
            details.push(id.split('-')[1].slice(0, -1));
            return createFormJobTemplate(...details)
        }
        case 'input-courses': {
            return createFormCourseTemplate(...details)
        }
        case 'interests-section':
        case 'languages-section': {
            return createPreviewLanguageTemplate(...details)
        }
        case 'job-experience-section': 
        case 'education-section': {
            return createPreviewJobExpTemplate(...details)
        }
        case 'courses-section': {
            return createPreviewCourseTemplate(...details)
        }
    }
}

// Form Section
function createFormInterestTemplate(text) {
    return `
    <li class="many-input-section__item">
        <input type="text" class="many-input-section__input" value="${text}" test-id="interest">
    </li>
    `
}

function createFormLanguageTemplate(language, level) {
    return `
    <li class="many-input-section__item">
        <p class="many-input-section__text">
            <input type="text" class="many-input-section__input" value="${language}" required test-id="language-name">
            <input type="text" class="many-input-section__input" value="${level}" required test-id="language-level">
        </p>
    </li>
    `
}

function createFormJobTemplate(title, startDate, endDate, place, description, type) {
    return `
    <li class="many-input-section__inputs">
        <input type="text" class="many-input-section__input" value="${title}" required test-id="${type}-title">
        <label for="job-date-start" class="many-input-section__label">Дата начала:
            <input type="date" class="many-input-section__input" id="job-date-start" value="${startDate}" test-id="${type}-date-start">
        </label>
        <label for="job-date-end" class="many-input-section__label">Дата конца: 
            <input type="date" class="many-input-section__input" id="job-date-end" value="${endDate}" test-id="${type}-date-end">
        </label>
        <input type="text" class="many-input-section__input" value="${place}" test-id="${type}-place">
        <input class="many-input-section__input" value="${description}" test-id="${type}-description">
    </li>
    `
}

function createFormCourseTemplate(title, startDate, endDate, place) {
    return `
    <li class="many-input-section__inputs">
        <input type="text" class="many-input-section__input" value="${title}" required test-id="course-title">
        <label for="job-date-start" class="many-input-section__label">Дата начала:
            <input type="date" class="many-input-section__input" id="job-date-start" value="${startDate}" test-id="course-date-start">
        </label>
        <label for="job-date-end" class="many-input-section__label">Дата конца: 
            <input type="date" class="many-input-section__input" id="job-date-end" value="${endDate}" test-id="course-date-end">
        </label>
        <input type="text" class="many-input-section__input" value="${place}" test-id="course-place">
    </li>
    `
}

// Preview Section
export function createSectionTemplate(title, section, id) {
    return `
    <div class="${section}-section__info" id='${id}' test-id="resume-main-section">
        <h2 class="${section}-section__header">${title}</h2>
        <ul class="${section}-section__list">
        </ul>
    </div>
    `
}

function createPreviewLanguageTemplate(language, level='') {    
    return `
    <li class="left-section__item">
        <h3 class="left-section__title">
        <span class="left-section__prefix">${language}</span>
        <span class="left-section__postfix">${level}</span>
        </h3>
    </li>
    `
}

function createPreviewJobExpTemplate(title, startDate, endDate, place, description) {
    startDate = startDate.split('-').reverse().join('.');
    endDate = endDate.split('-').reverse().join('.');
    return `
    <li class="info-block__item">
        <h3 class="info-block__title">${title}</h3>
        <div class="date-section info-block__date-section">
        <span class="date-section__date">${startDate}</span>
        ${startDate && '—'}
        <span class="date-section__date">${startDate && (endDate || 'наст. время')}</span>
        </div>
        <em class="info-block__company">${place}</em>
        <p class="info-block__description">${description}</p>
    </li>
    `
}

function createPreviewCourseTemplate(title, startDate, endDate, place) {
    startDate = startDate.split('-').reverse().join('.');
    endDate = endDate.split('-').reverse().join('.');
    return `
    <li class="info-block__item">
        <h3 class="info-block__title">${title}</h3>
        <div class="date-section info-block__date-section">
        <span class="date-section__date">${startDate}</span>
        ${startDate && '—'}
        <span class="date-section__date">${startDate && (endDate || 'наст. время')}</span>
        </div>
        <em class="info-block__company">${place}</em>
    </li>
    `
}

// List Section
export function createResumeItemTemplate(title) {
    return `
    <li class="resume-list__item" test-id="resume-item">
        <input class="resume-list__checkbox" type="checkbox">
        <h2 class="resume-list__title" test-id="resume-title">${title}</h2>
        <div class="resume-list__buttons">
            <button class="resume-list__button" id="action-button" title="Действия" test-id="resume-actions">...</button>
            <a href="./index.html" class="resume-list__button" id="open-button" test-id="resume-actions__open">Открыть</a>
            <button class="resume-list__button" id="delete-button" test-id="resume-actions__delete">Удалить</button>
            <button class="resume-list__button" id="copy-button" test-id="resume-actions__copy">Копировать</button>
        </div>
    </li>
    `
}