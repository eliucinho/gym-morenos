// js/storage.js

// Guarda el estado de un ítem (ejercicio o comida) en el localStorage
function saveStatusItem(itemType, dayIndex, itemName, state) {
    const key = `${dayIndex}-${itemType}-${itemName}`; // Clave única por día, tipo y nombre de ítem
    console.info(`saveStatusItem key: ${key} current value: ${getStatusItem(itemType, dayIndex, itemName)} new value: ${state}`);
    localStorage.setItem(key, state);
}

// Obtiene el estado de un ítem específico desde el localStorage
function getStatusItem(itemType, dayIndex, itemName) {
    const key = `${dayIndex}-${itemType}-${itemName}`; // Clave única por día, tipo y nombre de ítem
    console.info(`getStatusItem key: ${key} value: ${localStorage.getItem(key)}`);
    if(localStorage.getItem(key)=== null ){
        localStorage.setItem(key, 'pendiente');
        return 'pendiente';
    }
    return localStorage.getItem(key);
}

// Obtiene todos los estados de ítems (ejercicio o comida) para un día específico
function getStatusItems(itemType, dayIndex) {
    const statusItems = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`${dayIndex}-${itemType}-`)) {
            const itemName = key.split(`${dayIndex}-${itemType}-`)[1];
            statusItems[itemName] = localStorage.getItem(key);

            // Depuración para verificar qué estados se están cargando
            console.log(`Cargando estado de ${itemType} para ${itemName} en día ${dayIndex}: ${statusItems[itemName]}`);
        }
    }
    return statusItems;
}

// Limpia el estado de todos los ítems (ejercicio y comida) para un día específico en el localStorage
function clearStatusItems(dayIndex) {
    const keysToRemove = [];
    // Recorre todas las claves de localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`${dayIndex}-`)) {
            keysToRemove.push(key);
        }
    }
    // Elimina las claves correspondientes
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