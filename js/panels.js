// js/panels.js
function updatePanels(dayIndex, exercisesData, foodData) {
    const exercisePanel = document.getElementById('exercisePanel');
    const foodPanel = document.getElementById('foodPanel');

    if (!exercisesData || !foodData) {
        console.error("Datos de ejercicios o comida no disponibles");
        return;
    }

    const statusExercises = getStatusItems('exercise', dayIndex) || {};
    const statusFood = getStatusItems('food', dayIndex) || {};

    const dayExercises = exercisesData[dayIndex]?.ejercicios || [];

    // Ordenar los ejercicios según su tipo
    const sortedExercises = [
        ...dayExercises.filter(exercise => exercise.tipo === 'calentamiento'),
        ...dayExercises.filter(exercise => exercise.tipo === 'ejercicio'),
        ...dayExercises.filter(exercise => exercise.tipo === 'cardio'),
        ...dayExercises.filter(exercise => exercise.tipo === 'estiramiento')
    ];

    exercisePanel.innerHTML = sortedExercises.map((exercise, i) =>
        renderExerciseItem(`Ejercicio ${i + 1}`, exercise, dayIndex, statusExercises)
    ).join('');

    const dayFood = foodData[dayIndex] || {};
    foodPanel.innerHTML = `
        ${renderFoodItem("Desayuno", dayFood.desayuno, dayIndex, statusFood)}
        ${renderFoodItem("Media Mañana", dayFood.mediaManana, dayIndex, statusFood)}
        ${renderFoodItem("Almuerzo", dayFood.almuerzo, dayIndex, statusFood)}
        ${renderFoodItem("Merienda", dayFood.merienda, dayIndex, statusFood)}
        ${renderFoodItem("Cena", dayFood.cena, dayIndex, statusFood)}
        ${renderFoodItem("Antes de Dormir", dayFood.antesDeDormir, dayIndex, statusFood)}
    `;
}