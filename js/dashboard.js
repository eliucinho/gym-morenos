// js/dashboard.js
function setupDashboard(days, dayIndex, exercisesData, foodData) { // Acepta `days` como argumento
    updateDashboard(dayIndex, exercisesData, foodData);

    // Pasa `days` a createDayTabs
    createDayTabs(days, dayIndex, (selectedDayIndex) => {
        localStorage.setItem('savedDayIndex', selectedDayIndex);
        updateDashboard(selectedDayIndex, exercisesData, foodData);
    });
}

function updateDashboard(dayIndex, exercisesData, foodData) {
    const currentActivity = document.getElementById('currentActivity');
    const exerciseSummary = document.getElementById('exerciseSummary');
    const foodSuggestion = document.getElementById('foodSuggestion');
    const objectiveText = document.getElementById('objectiveText');

    currentActivity.innerText = determineActivityForTime();
    exerciseSummary.innerText = summarizeExercises(dayIndex, exercisesData);
    foodSuggestion.innerText = suggestFoodForTime(dayIndex, foodData);

    const { mainObjective, mainLevel } = analyzeUserProgress(exercisesData, dayIndex);
    objectiveText.innerText = `🎯 ${mainObjective}`;
}

function updateDashboard(dayIndex, exercisesData, foodData) {
    const currentActivity = document.getElementById('currentActivity');
    const exerciseSummary = document.getElementById('exerciseSummary');
    const foodSuggestion = document.getElementById('foodSuggestion');
    const objectiveText = document.getElementById('objectiveText');

    currentActivity.innerText = determineActivityForTime();
    exerciseSummary.innerText = summarizeExercises(dayIndex, exercisesData);
    foodSuggestion.innerText = suggestFoodForTime(dayIndex, foodData);

    const { mainObjective, mainLevel } = analyzeUserProgress(exercisesData, dayIndex);
    objectiveText.innerText = `🎯 ${mainObjective}`;
}

// Nueva función añadida para resumir los ejercicios
function summarizeExercises(dayIndex, exercisesData) {
    // Verifica que exercisesData es un array y que dayIndex está dentro del rango válido
    if (!Array.isArray(exercisesData) || dayIndex < 0 || dayIndex >= exercisesData.length) {
        console.warn("Datos de ejercicios no válidos o índice fuera de rango");
        return "Datos no disponibles";
    }

    const dayExercises = exercisesData[dayIndex]?.ejercicios || [];
    const statusExercises = getStatusItems('exercise', dayIndex) || {};

    const pendingExercises = dayExercises.filter(exercise => {
        const status = statusExercises[exercise.nombre] || 'pendiente';
        return status !== 'hecho';
    });

    const totalExercises = dayExercises.length;
    const estimatedTime = pendingExercises.reduce((total, exercise) => {
        return total + (exercise.tiempo ? parseInt(exercise.tiempo) : 10);
    }, 0);

    return `🏋️‍♂️ ${pendingExercises.length}/${totalExercises} Ejercicios, ${estimatedTime} minutos`;
}

function suggestFoodForTime(dayIndex, foodData) {
    const dayFood = foodData[dayIndex] || {};
    const hour = new Date().getHours();
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

    return foodToEat;
}