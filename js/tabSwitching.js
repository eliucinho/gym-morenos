// js/tabSwitching.js

function setupTabSwitching() {
    const exerciseTabButton = document.getElementById('exerciseTabButton');
    const foodTabButton = document.getElementById('foodTabButton');
    const exercisePanelContainer = document.getElementById('exercisePanelContainer');
    const foodPanelContainer = document.getElementById('foodPanelContainer');

    // Añadir eventos de clic para alternar paneles
    exerciseTabButton.addEventListener('click', function () {
        togglePanels('exercise');
    });

    foodTabButton.addEventListener('click', function () {
        togglePanels('food');
    });
}

function togglePanels(panel) {
    const exercisePanelContainer = document.getElementById('exercisePanelContainer');
    const foodPanelContainer = document.getElementById('foodPanelContainer');
    const exerciseTabButton = document.getElementById('exerciseTabButton');
    const foodTabButton = document.getElementById('foodTabButton');

    if (panel === 'exercise') {
        exercisePanelContainer.classList.remove('d-none');
        foodPanelContainer.classList.add('d-none');
        exerciseTabButton.classList.add('active');
        foodTabButton.classList.remove('active');
    } else if (panel === 'food') {
        foodPanelContainer.classList.remove('d-none');
        exercisePanelContainer.classList.add('d-none');
        foodTabButton.classList.add('active');
        exerciseTabButton.classList.remove('active');
    }
}