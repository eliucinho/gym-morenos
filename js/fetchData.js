//js/fetchData.js
async function fetchData() {
    try {
        const exercisesResponse = await fetch('ejercicios.json');
        const exercises = await exercisesResponse.json();
        const exercisesData = exercises.rutina || []; // Asegúrate de que sea un array

        const foodResponse = await fetch('comida.json');
        const food = await foodResponse.json();
        const foodData = food.comidas || []; // Asegúrate de que sea un array

        // Guarda los datos en localStorage
        localStorage.setItem('exercisesData', JSON.stringify(exercisesData));
        localStorage.setItem('foodData', JSON.stringify(foodData));

        return { exercisesData, foodData };
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        return { exercisesData: [], foodData: [] }; // Retorna arrays vacíos si hay un error
    }
}

function initializeDayIndex() {
    let savedDayIndex = parseInt(localStorage.getItem('savedDayIndex'), 10);
    if (isNaN(savedDayIndex)) {
        savedDayIndex = new Date().getDay();
        savedDayIndex = savedDayIndex === 0 ? 6 : savedDayIndex - 1; // Ajusta para que Lunes sea 0 y Domingo sea 6
    }
    return savedDayIndex;
}