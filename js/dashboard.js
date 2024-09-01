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
        exerciseSummary.innerText = summarizeExercises(dayIndex); // Asegúrate de pasar exercisesData
        foodSuggestion.innerText = suggestFoodForTime(dayIndex, foodData);

        const { mainObjective, mainLevel } = analyzeUserProgress(dayIndex, exercisesData);
        objectiveText.innerText = `🎯 ${mainObjective} (${mainLevel})`;
    } catch (error) {
        console.error("Error al actualizar el dashboard:", error);
    }
}
// Función para resumir los ejercicios
function summarizeExercises(dayIndex) {
    try {
        const exercisesData=getExerciseListData();
        // Verifica que exercisesData es un array y que dayIndex está dentro del rango válido
        if (!Array.isArray(exercisesData) || dayIndex < 0 || dayIndex >= exercisesData.length) {
            console.warn("Datos de ejercicios no válidos o índice fuera de rango");
            return "Datos no disponibles";
        }

        const dayExercises = exercisesData[dayIndex]?.ejercicios || [];
        //const statusExercises = getStatusItems('Exercise', dayIndex) || {};

        // Calcula los ejercicios pendientes usando el estado almacenado
        const doneExcersices = dayExercises.filter(exercise => {
            //console.warn(`summarizeExercises-${JSON.stringify(exercise, null, 2)}`);
            // Verifica si el ID está definido antes de usar split
            if (!exercise.id || typeof exercise.id !== 'string') {
                console.warn(`ID no definido o no válido para el ejercicio: ${exercise.nombre}`);
                return false; // Excluye ejercicios con IDs inválidos
            }
            const status = getStatusItem(exercise.id); 

            exercise.tiempo=(exercise.tiempo ? parseInt(exercise.tiempo) : 10);

            console.warn(`summarizeExercises exercise.id: ${exercise.id} exercise.tiempo ${exercise.tiempo}`);
            return status === 'hecho' ||status === 'omitido' ;
        });

        const pendingExcersices = dayExercises.filter(exercise => {
            //console.warn(`summarizeExercises-${JSON.stringify(exercise, null, 2)}`);
            // Verifica si el ID está definido antes de usar split
            if (!exercise.id || typeof exercise.id !== 'string') {
                console.warn(`ID no definido o no válido para el ejercicio: ${exercise.nombre}`);
                return false; // Excluye ejercicios con IDs inválidos
            }
            const status = getStatusItem(exercise.id); 

            exercise.tiempo=(exercise.tiempo ? parseInt(exercise.tiempo) : 10);

            console.warn(`summarizeExercises exercise.id: ${exercise.id} exercise.tiempo ${exercise.tiempo}`);
            return status === 'pendiente';
        });

        const totalExercises = dayExercises.length;
        const estimatedTime = pendingExcersices.reduce((total, exercise) => {
            return total + (exercise.tiempo ? parseInt(exercise.tiempo) : 10);
        }, 0);

        console.warn(`summarizeExercises totalExercises: ${totalExercises} estimatedTime: ${estimatedTime}`);
        return `🏋️‍♂️ ${doneExcersices.length}/${totalExercises} Ejercicios, ${estimatedTime} minutos restantes`;
    } catch (error) {
        console.error("Error al resumir los ejercicios:", error);
        return "Error al cargar los ejercicios.";
    }
}

function suggestFoodForTime(dayIndex, foodData) {
    try {
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