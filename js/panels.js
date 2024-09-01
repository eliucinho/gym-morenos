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
        renderExerciseItem(`Ejercicio ${i + 1}`, exercise, dayIndex, `exercise-${dayIndex}-${i + 1}`) // Añade el ID único aquí
    ).join('');

    const dayFood = foodData[dayIndex] || {};

    foodPanel.innerHTML = `
        ${renderFoodItem("Desayuno", dayFood.desayuno, dayIndex, `food-${dayIndex}-1`)}
        ${renderFoodItem("Media Mañana", dayFood.mediaManana, dayIndex, `food-${dayIndex}-2`)}
        ${renderFoodItem("Almuerzo", dayFood.almuerzo, dayIndex, `food-${dayIndex}-3`)}
        ${renderFoodItem("Merienda", dayFood.merienda, dayIndex, `food-${dayIndex}-4`)}
        ${renderFoodItem("Cena", dayFood.cena, dayIndex, `food-${dayIndex}-5`)}
        ${renderFoodItem("Antes de Dormir", dayFood.antesDeDormir, dayIndex, `food-${dayIndex}-6`)}
    `;
}