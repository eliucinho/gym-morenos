// js/dashboard.js

function setupDashboard(days, dayIndex, exercisesData, foodData) {
    try {
        updateDashboard(dayIndex, exercisesData, foodData);

        // Pasa `days` a createDayTabs
        createDayTabs(days, dayIndex, (selectedDayIndex) => {
            setSavedDayIndex(selectedDayIndex);
            try {
                updateDashboard(selectedDayIndex, exercisesData, foodData);
            } catch (error) {
                console.error("Error al actualizar el dashboard:", error);
            }
        });
    } catch (error) {
        console.error("Error al configurar el dashboard:", error);
    }
}

function updateDashboard(dayIndex, exercisesData, foodData) {
    try {
        const currentActivity = document.getElementById('currentActivity');
        const exerciseSummary = document.getElementById('exerciseSummary');
        const foodSuggestion = document.getElementById('foodSuggestion');
        const objectiveText = document.getElementById('objectiveText');

        currentActivity.innerText = determineActivityForTime();
        exerciseSummary.innerText = summarizeExercises(dayIndex);
        foodSuggestion.innerText = suggestFoodForTime(dayIndex);

        const { mainObjective, mainLevel } = analyzeUserProgress();
        objectiveText.innerText = `🎯 ${mainObjective}`;
    } catch (error) {
        console.error("Error al actualizar el dashboard:", error);
    }
}

// Función para resumir los ejercicios
function summarizeExercises(dayIndex) {
    try {
        const exercisesData = getExerciseListData();

        // Verifica que exercisesData es un array y que dayIndex está dentro del rango válido
        if (!Array.isArray(exercisesData) || dayIndex < 0 || dayIndex >= exercisesData.length) {
            console.warn("Datos de ejercicios no válidos o índice fuera de rango");
            return "Datos no disponibles";
        }

        const dayExercises = exercisesData[dayIndex]?.ejercicios || [];
        const statusExercises = getStatusItems('Exercise', dayIndex) || {};

        const pendingExercises = dayExercises.filter(exercise => {
            const status = statusExercises[exercise.id] || 'pendiente'; // Usa el ID único para obtener el estado
            return status !== 'hecho';
        });

        const totalExercises = dayExercises.length;
        const estimatedTime = pendingExercises.reduce((total, exercise) => {
            return total + (exercise.tiempo ? parseInt(exercise.tiempo) : 10);
        }, 0);

        return `🏋️‍♂️ ${pendingExercises.length}/${totalExercises} Ejercicios, ${estimatedTime} minutos`;
    } catch (error) {
        console.error("Error al resumir los ejercicios:", error);
        return "Error al cargar los ejercicios.";
    }
}

function suggestFoodForTime(dayIndex) {
    try {
        const foodData = getFoodListData();
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
    } catch (error) {
        console.error("Error al sugerir comida para el tiempo actual:", error);
        return "Error al cargar sugerencias de comida.";
    }
}