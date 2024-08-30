//js/panels.js
function updatePanels(dayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem) {
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
        renderExerciseItem(`Ejercicio ${i + 1}`, exercise, statusExercises)
    ).join('');

    const dayFood = foodData[dayIndex] || {};
    foodPanel.innerHTML = `
        ${renderFoodItem("Desayuno", dayFood.desayuno, statusFood)}
        ${renderFoodItem("Media Mañana", dayFood.mediaManana, statusFood)}
        ${renderFoodItem("Almuerzo", dayFood.almuerzo, statusFood)}
        ${renderFoodItem("Merienda", dayFood.merienda, statusFood)}
        ${renderFoodItem("Cena", dayFood.cena, statusFood)}
        ${renderFoodItem("Antes de Dormir", dayFood.antesDeDormir, statusFood)}
    `;
}