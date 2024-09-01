// js/storage.js

// Guarda o actualiza el estado de un ítem (ejercicio o comida) en el localStorage
function saveStatusItem(itemId, state) {
    const existingValue = localStorage.getItem(itemId.toLowerCase());

    if (existingValue != null) {
        console.info(`Actualizando ítem existente: ${itemId} con nuevo estado: ${state}`);
    } else {
        console.info(`Guardando nuevo ítem: ${itemId} con estado: ${state}`);
    }

    // Guarda o actualiza el estado del ítem
    localStorage.setItem(itemId, state);
}

// Obtiene el estado de un ítem específico desde el localStorage
function getStatusItem(itemId) {
    const value = localStorage.getItem(itemId.toLowerCase());

    if (value === null) {
        console.info(`El ítem: ${itemId} no existe en localStorage, creando con estado inicial 'pendiente'`);
        localStorage.setItem(itemId, 'pendiente'); // Si no existe, lo crea con el estado 'pendiente'
        return 'pendiente';
    } else {
        console.info(`El ítem: ${itemId} existe con estado: ${value}`);
        return value; // Devuelve el estado existente
    }
}

// Obtiene todos los estados de ítems (ejercicio o comida) para un día específico
function getStatusItems(itemType, dayIndex) {
    const statusItems = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`${dayIndex}-${itemType}-`)) {
            const itemId = key.split(`${dayIndex}-${itemType}-`)[1];
            statusItems[itemId] = localStorage.getItem(key);

            // Depuración para verificar qué estados se están cargando
            console.log(`Cargando estado de ${itemType} para ${itemId} en día ${dayIndex}: ${statusItems[itemId]}`);
        }
    }
    return statusItems;
}

// Limpia el estado de todos los ítems (ejercicio y comida) para un día específico en el localStorage
function clearStatusItems(dayIndex) {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`${dayIndex}-`)) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
}

// Obtiene el índice del día seleccionado previamente desde el localStorage
function getSavedDayIndex() {
    return parseInt(localStorage.getItem('savedDayIndex'), 10);
}

// Guarda el índice del día seleccionado en el localStorage
function setSavedDayIndex(dayIndex) {
    localStorage.setItem('savedDayIndex', dayIndex);
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

function saveExerciseListData(exercisesData) {
    localStorage.setItem('exercisesData', JSON.stringify(exercisesData));
}

function saveFoodListData(foodData) {
    localStorage.setItem('foodData', JSON.stringify(foodData));
}

function getExerciseListData() {
    return JSON.parse(localStorage.getItem('exercisesData')) || [];
}

function getFoodListData() {
    return JSON.parse(localStorage.getItem('foodData')) || [];
}