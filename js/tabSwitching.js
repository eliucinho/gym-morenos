// js/tabSwitching.js

function setupTabSwitching() {
    const exerciseTabButton = document.getElementById('exerciseTabButton');
    const foodTabButton = document.getElementById('foodTabButton');
    const exercisePanelContainer = document.getElementById('exercisePanelContainer');
    const foodPanelContainer = document.getElementById('foodPanelContainer');

    // Verificar si los elementos existen antes de añadir los eventos
    if (exerciseTabButton && foodTabButton && exercisePanelContainer && foodPanelContainer) {
        // Añadir eventos de clic para alternar paneles
        exerciseTabButton.addEventListener('click', function () {
            togglePanels('exercise');
        });

        foodTabButton.addEventListener('click', function () {
            togglePanels('food');
        });
    } else {
        console.error('Uno o más elementos del DOM no se encontraron. Verifique el HTML.');
    }
}

function togglePanels(panel) {
    const exercisePanelContainer = document.getElementById('exercisePanelContainer');
    const foodPanelContainer = document.getElementById('foodPanelContainer');
    const exerciseTabButton = document.getElementById('exerciseTabButton');
    const foodTabButton = document.getElementById('foodTabButton');

    // Verificar si los elementos existen antes de realizar las manipulaciones
    if (!exercisePanelContainer || !foodPanelContainer || !exerciseTabButton || !foodTabButton) {
        console.error('Uno o más elementos del DOM no se encontraron. Verifique el HTML.');
        return; // Salir de la función si no se encuentran los elementos
    }

    if (panel === 'exercise') {
        exercisePanelContainer.style.display = 'block';  // Mostrar el panel de ejercicios
        foodPanelContainer.style.display = 'none';        // Ocultar el panel de comida
        exerciseTabButton.classList.add('active');
        foodTabButton.classList.remove('active');
    } else if (panel === 'food') {
        foodPanelContainer.style.display = 'block';       // Mostrar el panel de comida
        exercisePanelContainer.style.display = 'none';    // Ocultar el panel de ejercicios
        foodTabButton.classList.add('active');
        exerciseTabButton.classList.remove('active');
    } else {
        console.warn('Panel no reconocido:', panel);
    }
}