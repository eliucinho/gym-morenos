// js/statusHandlers.js

// js/statusHandlers.js

document.addEventListener('click', function(event) {
    if (event.target.closest('.status-button')) {
        const button = event.target.closest('.status-button');
        const itemId = button.getAttribute('data-id'); // Utiliza el ID único generado para el ítem
        const currentState = button.getAttribute('data-state');
        const dayIndex = button.getAttribute('data-day'); // Obtén el índice del día desde el atributo data-day

        // Asegúrate de que el itemId esté definido
        if (!itemId) {
            console.error('Error: El ID del ítem no está definido.');
            return;
        }

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
        saveStatusItem(itemId, newState); // Usa el itemId generado

        // Actualiza el dashboard con los datos más recientes
        const exercisesData = getExerciseListData();
        const foodData = getFoodListData();
        updateDashboard(dayIndex, exercisesData, foodData); // Pasa el dayIndex correctamente
    }
});

// Función para actualizar el estado visual del botón
function updateButtonState(button, newState) {
    const { buttonClass, buttonIcon } = getButtonStateAndClass(newState);
    button.setAttribute('data-state', newState);
    button.className = `btn status-button ${buttonClass} rounded-circle`;
    button.innerHTML = buttonIcon;
}