// js/panels.js
function updatePanels(dayIndex, exercisesData, foodData) {
    const exercisePanel = document.getElementById('exercisePanel');
    const foodPanel = document.getElementById('foodPanel');

    if (!exercisesData || !foodData) {
        console.error("Datos de ejercicios o comida no disponibles");
        return;
    }

    const dayExercises = exercisesData[dayIndex]?.ejercicios || [];

    // Ordenar los ejercicios según su tipo
    const sortedExercises = [
        ...dayExercises.filter(exercise => exercise.tipo === 'calentamiento'),
        ...dayExercises.filter(exercise => exercise.tipo === 'ejercicio'),
        ...dayExercises.filter(exercise => exercise.tipo === 'cardio'),
        ...dayExercises.filter(exercise => exercise.tipo === 'estiramiento')
    ];

    exercisePanel.innerHTML = sortedExercises.map((exercise, i) =>
        renderExerciseItem(`Ejercicio ${i + 1}`, exercise, dayIndex)
    ).join('');

    const dayFood = foodData[dayIndex] || {};

    foodPanel.innerHTML = `
        ${renderFoodItem("Comida 1","Desayuno", dayFood.desayuno, dayIndex)}
        ${renderFoodItem("Comida 2","Media Mañana", dayFood.mediaManana, dayIndex)}
        ${renderFoodItem("Comida 3","Almuerzo", dayFood.almuerzo, dayIndex)}
        ${renderFoodItem("Comida 4","Merienda", dayFood.merienda, dayIndex)}
        ${renderFoodItem("Comida 5","Cena", dayFood.cena, dayIndex)}
        ${renderFoodItem("Comida 6","Antes de Dormir", dayFood.antesDeDormir, dayIndex)}
    `;
}