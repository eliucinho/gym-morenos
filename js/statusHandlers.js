// js/statusHandlers.js

document.addEventListener('click', function(event) {
    if (event.target.closest('.status-button')) {
        const button = event.target.closest('.status-button');
        const itemType = button.getAttribute('data-type');
        const itemName = button.getAttribute('data-name');
        const currentState = button.getAttribute('data-state');
        const dayIndex = button.getAttribute('data-day'); // Obtén el día específico del ítem

        // Lógica de cambio de estado: pendiente -> hecho -> omitido -> pendiente
        let newState;
        if (currentState === 'pendiente') {
            newState = 'hecho';
        } else if (currentState === 'hecho') {
            newState = 'omitido';
        } else {
            newState = 'pendiente';
        }

        // Actualiza el estado del botón
        updateButtonState(button, newState);  // Llamada a la función de actualización del botón

        // Guarda el estado actualizado en localStorage con la clave única
        saveStatusItem(itemType, dayIndex, itemName, newState);

        // Actualiza el dashboard con los datos más recientes
        const exercisesData = JSON.parse(localStorage.getItem('exercisesData')) || [];
        const foodData = JSON.parse(localStorage.getItem('foodData')) || [];
        updateDashboard(dayIndex, exercisesData, foodData);
    }
});

// Función para actualizar el estado visual del botón
function updateButtonState(button, newState) {
    const { buttonClass, buttonIcon } = getButtonStateAndClass(newState);
    button.setAttribute('data-state', newState);
    button.className = `btn status-button ${buttonClass} rounded-circle`;
    button.innerHTML = buttonIcon;
}