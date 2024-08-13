function saveStatusItem(itemType, dayIndex, itemName, state) {
    const key = itemType === 'exercise' ? `statusExercises-${dayIndex}` : `statusFood-${dayIndex}`;
    let statusItems = JSON.parse(localStorage.getItem(key)) || {};
    statusItems[itemName] = state;
    localStorage.setItem(key, JSON.stringify(statusItems));
}

function getStatusItems(itemType, dayIndex) {
    const key = itemType === 'exercise' ? `statusExercises-${dayIndex}` : `statusFood-${dayIndex}`;
    return JSON.parse(localStorage.getItem(key)) || {};
}

function clearStatusItems(dayIndex) {
    localStorage.removeItem(`statusExercises-${dayIndex}`);
    localStorage.removeItem(`statusFood-${dayIndex}`);
}

function getSavedDayIndex() {
    return localStorage.getItem('selectedDayIndex');
}

function setSavedDayIndex(dayIndex) {
    localStorage.setItem('selectedDayIndex', dayIndex);
}

function clearLocalStorage() {
    localStorage.clear();
}

function setLastVisitDate(date) {
    localStorage.setItem('lastVisitDate', date);
}

function getLastVisitDate() {
    return localStorage.getItem('lastVisitDate');
}