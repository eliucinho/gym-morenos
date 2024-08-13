function updatePanels(dayIndex, exercisesData, foodData, renderCheckableItem) {
    const exercisePanel = document.getElementById('exercisePanel');
    const foodPanel = document.getElementById('foodPanel');

    const statusExercises = getStatusItems('exercise', dayIndex);
    const statusFood = getStatusItems('food', dayIndex);

    const dayExercises = exercisesData[dayIndex];
    exercisePanel.innerHTML = `
        ${renderCheckableItem("Calentamiento", dayExercises.calentamiento, statusExercises, "exercise")}
        ${dayExercises.ejercicios.map((ejercicio, i) => renderCheckableItem(`Ejercicio ${i+1}`, `${ejercicio.nombre}: ${ejercicio.peso}, ${ejercicio.numeroRepeticion} repeticiones, ${ejercicio.series} series, Objetivo: ${ejercicio.objetivo}, Nivel: ${ejercicio.nivel}`, statusExercises, "exercise")).join('')}
        ${renderCheckableItem("Cardio", dayExercises.cardio, statusExercises, "exercise")}
        ${renderCheckableItem("Estiramientos", dayExercises.estiramientos, statusExercises, "exercise")}
    `;

    const dayFood = foodData[dayIndex];
    foodPanel.innerHTML = `
        ${renderCheckableItem("Desayuno", dayFood.desayuno, statusFood, "food")}
        ${renderCheckableItem("Media Mañana", dayFood.mediaManana, statusFood, "food")}
        ${renderCheckableItem("Almuerzo", dayFood.almuerzo, statusFood, "food")}
        ${renderCheckableItem("Merienda", dayFood.merienda, statusFood, "food")}
        ${renderCheckableItem("Cena", dayFood.cena, statusFood, "food")}
        ${renderCheckableItem("Antes de Dormir", dayFood.antesDeDormir, statusFood, "food")}
    `;
}