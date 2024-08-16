// Guarda el estado de un ítem (ejercicio o comida) en el localStorage
function saveStatusItem(itemType, dayIndex, itemName, state) {
    const key = itemType === 'exercise' ? `statusExercises-${dayIndex}` : `statusFood-${dayIndex}`;
    let statusItems = JSON.parse(localStorage.getItem(key)) || {};
    statusItems[itemName] = state;
    localStorage.setItem(key, JSON.stringify(statusItems));
}

// Obtiene todos los ítems (ejercicio o comida) guardados para un día específico desde el localStorage
function getStatusItems(itemType, dayIndex) {
    const key = itemType === 'exercise' ? `statusExercises-${dayIndex}` : `statusFood-${dayIndex}`;
    return JSON.parse(localStorage.getItem(key)) || {};
}

// Limpia el estado de todos los ítems (ejercicio y comida) para un día específico en el localStorage
function clearStatusItems(dayIndex) {
    localStorage.removeItem(`statusExercises-${dayIndex}`);
    localStorage.removeItem(`statusFood-${dayIndex}`);
}

// Obtiene el índice del día seleccionado previamente desde el localStorage
function getSavedDayIndex() {
    return localStorage.getItem('selectedDayIndex');
}

// Guarda el índice del día seleccionado en el localStorage
function setSavedDayIndex(dayIndex) {
    localStorage.setItem('selectedDayIndex', dayIndex);
}

// Limpia todo el localStorage
function clearLocalStorage() {
    localStorage.clear();
}

// Guarda la fecha de la última visita en el localStorage
function setLastVisitDate(date) {
    localStorage.setItem('lastVisitDate', date);
}

// Obtiene la fecha de la última visita desde el localStorage
function getLastVisitDate() {
    return localStorage.getItem('lastVisitDate');
}