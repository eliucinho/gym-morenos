// js/main.js

document.addEventListener("DOMContentLoaded", function () {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    function getTodayIndex() {
        const today = new Date().getDay();
        return today === 0 ? 6 : today - 1; // Ajusta para que Lunes sea 0 y Domingo sea 6
    }

    function getSavedDayIndex() {
        return parseInt(localStorage.getItem('savedDayIndex'), 10);
    }

    function setSavedDayIndex(index) {
        localStorage.setItem('savedDayIndex', index);
    }

    let savedDayIndex = getSavedDayIndex();
    if (savedDayIndex === null || isNaN(savedDayIndex)) {
        savedDayIndex = getTodayIndex();
    }

    const lastVisitDate = getLastVisitDate();
    const todayDate = new Date().toLocaleDateString();

    if (lastVisitDate !== todayDate) {
        clearLocalStorage();
        setLastVisitDate(todayDate);
    }

    let exercisesData, foodData;

    const fetchData = async () => {
        const exercisesResponse = await fetch('ejercicios.json');
        const exercises = await exercisesResponse.json();
        exercisesData = exercises.rutina;

        const foodResponse = await fetch('comida.json');
        const food = await foodResponse.json();
        foodData = food.comidas;

        // Guarda los datos en localStorage
        localStorage.setItem('exercisesData', JSON.stringify(exercisesData));
        localStorage.setItem('foodData', JSON.stringify(foodData));

        // Actualiza el dashboard para el día seleccionado
        updateDashboard(savedDayIndex, exercisesData, foodData);

        // Crea las pestañas y establece el manejador de selección
        createDayTabs(days, savedDayIndex, (dayIndex) => {
            setSavedDayIndex(dayIndex);
            updatePanels(dayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem);
            attachStatusButtonHandlers(dayIndex, exercisesData, foodData); // Asegúrate de llamar aquí

            // Actualiza el dashboard al cambiar de pestaña
            console.log("Cambiando a pestaña del día:", dayIndex);
            updateDashboard(dayIndex, exercisesData, foodData);
        });

        updatePanels(savedDayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem);
        attachStatusButtonHandlers(savedDayIndex, exercisesData, foodData); // Asegúrate de llamar aquí también

        setupTabSwitching();
    };

    fetchData();
});

// Configura la funcionalidad de alternancia de pestañas
function setupTabSwitching() {
    const exerciseTabButton = document.getElementById('exerciseTabButton');
    const foodTabButton = document.getElementById('foodTabButton');
    const exercisePanelContainer = document.getElementById('exercisePanelContainer');
    const foodPanelContainer = document.getElementById('foodPanelContainer');

    exerciseTabButton.addEventListener('click', function () {
        exercisePanelContainer.classList.remove('d-none');
        foodPanelContainer.classList.add('d-none');
        exerciseTabButton.classList.add('active');
        foodTabButton.classList.remove('active');
    });

    foodTabButton.addEventListener('click', function () {
        foodPanelContainer.classList.remove('d-none');
        exercisePanelContainer.classList.add('d-none');
        foodTabButton.classList.add('active');
        exerciseTabButton.classList.remove('active');
    });
}

// Actualiza el dashboard con la actividad actual
function updateDashboard(dayIndex, exercisesData, foodData) {
    const dashboard = document.getElementById('todayDashboard');
    const currentActivity = document.getElementById('currentActivity');
    const exerciseSummary = document.getElementById('exerciseSummary');
    const foodSuggestion = document.getElementById('foodSuggestion');
    const objectiveText = document.getElementById('objectiveText');

    const now = new Date();
    const hour = now.getHours();

    // Definir la actividad del día en base a la hora
    let activity;
    if (hour >= 6 && hour < 9) {
        activity = "🏋️‍♂️ Calentamiento matutino";
    } else if (hour >= 9 && hour < 12) {
        activity = "💪 Ejercicio de fuerza";
    } else if (hour >= 12 && hour < 15) {
        activity = "🍽️ Almuerzo saludable";
    } else if (hour >= 15 && hour < 18) {
        activity = "🏃‍♂️ Cardio de tarde";
    } else if (hour >= 18 && hour < 21) {
        activity = "🧘‍♀️ Estiramientos y relajación";
    } else {
        activity = "🛏️ Descanso";
    }

    currentActivity.innerText = activity;

    // Obtener estado de los ejercicios
    const statusExercises = getStatusItems('exercise', dayIndex) || {};
    const dayExercises = exercisesData[dayIndex]?.ejercicios || [];

    // Filtrar ejercicios pendientes
    const pendingExercises = dayExercises.filter(exercise => {
        const status = statusExercises[exercise.nombre] || 'pendiente';
        return status !== 'hecho';
    });

    const totalExercises = dayExercises.length;
    const estimatedTime = pendingExercises.reduce((total, exercise) => {
        return total + (exercise.tiempo ? parseInt(exercise.tiempo) : 10);
    }, 0);

    // Actualizar el resumen de ejercicios
    exerciseSummary.innerText = `🏋️‍♂️ ${pendingExercises.length}/${totalExercises} Ejercicios, ${estimatedTime} minutos`;

    // Sugerir la comida según la hora
    const dayFood = foodData[dayIndex] || {};
    let foodToEat;
    if (hour >= 6 && hour < 9) {
        foodToEat = dayFood.desayuno ? `🍳 ${dayFood.desayuno.nombre}` : 'Desayuno no disponible.';
    } else if (hour >= 9 && hour < 12) {
        foodToEat = dayFood.mediaManana ? `🥤 ${dayFood.mediaManana.nombre}` : 'Media Mañana no disponible.';
    } else if (hour >= 12 && hour < 15) {
        foodToEat = dayFood.almuerzo ? `🥗 ${dayFood.almuerzo.nombre}` : 'Almuerzo no disponible.';
    } else if (hour >= 15 && hour < 18) {
        foodToEat = dayFood.merienda ? `🍌 ${dayFood.merienda.nombre}` : 'Merienda no disponible.';
    } else if (hour >= 18 && hour < 21) {
        foodToEat = dayFood.cena ? `🍲 ${dayFood.cena.nombre}` : 'Cena no disponible.';
    } else {
        foodToEat = dayFood.antesDeDormir ? `🥛 ${dayFood.antesDeDormir.nombre}` : 'Antes de Dormir no disponible.';
    }

    foodSuggestion.innerText = foodToEat;

    // Obtener el análisis de progreso del usuario
    const { mainObjective, mainLevel } = analyzeUserProgress(exercisesData, dayIndex);
    const difficultIngredients = findHardToFindIngredients(foodData, dayIndex);

    // Animar el objetivo
    objectiveText.classList.add('pulse-animation');
    objectiveText.innerText = `🎯 ${mainObjective}`;

    // Crear un contenedor adicional para mostrar la nueva información
    const additionalInfoContainer = document.getElementById('additionalInfo');
    /*additionalInfoContainer.innerHTML = `
        <span class="badge badge-info mr-2">🥉 Nivel: ${mainLevel}</span>
        <span class="badge badge-danger">Ingredientes difíciles: ${difficultIngredients.length > 0 ? difficultIngredients.join(', ') : 'Ninguno'}</span>
    `;*/

    additionalInfoContainer.innerHTML = `
    <span class="badge badge-info mr-2">🥉 Nivel: ${mainLevel}</span>
`;


    // Animación del Dashboard
    dashboard.classList.add('animate__animated', 'animate__fadeIn');
    setTimeout(() => {
        dashboard.classList.remove('animate__animated', 'animate__fadeIn');
    }, 1000); // Duración de la animación de entrada
}

// Define la función attachStatusButtonHandlers
function attachStatusButtonHandlers(dayIndex, exercisesData, foodData) {
    const statusButtons = document.querySelectorAll('.status-button');

    statusButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const itemType = button.getAttribute('data-type');
            const itemName = button.getAttribute('data-name');
            const currentState = button.getAttribute('data-state');

            // Cambio de estado
            let newState;
            if (currentState === 'pendiente') {
                newState = 'hecho';
            } else if (currentState === 'hecho') {
                newState = 'omitido';
            } else {
                newState = 'pendiente';
            }

            // Actualiza el estado del botón
            button.setAttribute('data-state', newState);
            const { buttonClass, buttonIcon } = getButtonStateAndClass(newState);
            button.className = `btn status-button ${buttonClass} rounded-circle`;
            button.innerHTML = buttonIcon;

            // Guarda el estado actualizado
            saveStatusItem(itemType, dayIndex, itemName, newState);

            // Depuración para verificar que se guarda correctamente
            console.log(`Guardando estado: ${newState} para ${itemType} ${itemName} en día ${dayIndex}`);

            // Actualiza el dashboard con los datos más recientes
            updateDashboard(dayIndex, exercisesData, foodData);
        });
    });
}

function analyzeUserProgress(exercisesData, dayIndex) {
    const dayExercises = exercisesData[dayIndex]?.ejercicios || [];

    // Contar la frecuencia de cada objetivo y nivel
    const objectiveCount = {};
    const levelCount = {};

    dayExercises.forEach(exercise => {
        const { objetivo, nivel } = exercise;
        
        // Contar los objetivos
        if (objectiveCount[objetivo]) {
            objectiveCount[objetivo]++;
        } else {
            objectiveCount[objetivo] = 1;
        }

        // Contar los niveles
        if (levelCount[nivel]) {
            levelCount[nivel]++;
        } else {
            levelCount[nivel] = 1;
        }
    });

    // Determinar el objetivo más frecuente
    const mainObjective = Object.keys(objectiveCount).reduce((a, b) => objectiveCount[a] > objectiveCount[b] ? a : b);

    // Determinar el nivel más frecuente
    const mainLevel = Object.keys(levelCount).reduce((a, b) => levelCount[a] > levelCount[b] ? a : b);

    return { mainObjective, mainLevel };
}

function findHardToFindIngredients(foodData, dayIndex) {
    const hardToFindItems = ["quinoa", "semillas de chía", "aguacate", "proteína en polvo"];
    const dayFood = foodData[dayIndex] || {};
    const difficultIngredients = [];

    // Revisar cada comida del día
    for (let meal in dayFood) {
        if (dayFood[meal]?.ingredientes) {
            dayFood[meal].ingredientes.forEach(ingredient => {
                if (hardToFindItems.some(item => ingredient.toLowerCase().includes(item))) {
                    difficultIngredients.push(ingredient);
                }
            });
        }
    }

    return difficultIngredients;
}