function updatePanels(dayIndex, exercisesData, foodData) {
    const exercisePanel = document.getElementById('exercisePanel');
    const foodPanel = document.getElementById('foodPanel');

    const statusExercises = getStatusItems('exercise', dayIndex);
    const statusFood = getStatusItems('food', dayIndex);

    // Renderizar los ejercicios del día
    const dayExercises = exercisesData[dayIndex];
    exercisePanel.innerHTML = `
        ${renderExerciseItem("Calentamiento", { nombre: dayExercises.calentamiento }, statusExercises)}
        ${dayExercises.ejercicios.map((ejercicio, i) => renderExerciseItem(`Ejercicio ${i+1}`, ejercicio, statusExercises)).join('')}
        ${renderExerciseItem("Cardio", { nombre: dayExercises.cardio }, statusExercises)}
        ${renderExerciseItem("Estiramientos", { nombre: dayExercises.estiramientos }, statusExercises)}
    `;

    // Renderizar las comidas del día
    const dayFood = foodData[dayIndex];
    foodPanel.innerHTML = `
        ${renderFoodItem("Desayuno", dayFood.desayuno, statusFood)}
        ${renderFoodItem("Media Mañana", dayFood.mediaManana, statusFood)}
        ${renderFoodItem("Almuerzo", dayFood.almuerzo, statusFood)}
        ${renderFoodItem("Merienda", dayFood.merienda, statusFood)}
        ${renderFoodItem("Cena", dayFood.cena, statusFood)}
        ${renderFoodItem("Antes de Dormir", dayFood.antesDeDormir, statusFood)}
    `;
}