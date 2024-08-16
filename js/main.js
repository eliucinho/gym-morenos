document.addEventListener("DOMContentLoaded", function () {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    // Obtener el índice del día guardado o el día actual
    let savedDayIndex = getSavedDayIndex();
    if (savedDayIndex !== null) {
        savedDayIndex = parseInt(savedDayIndex);
    } else {
        const today = new Date().getDay() - 1;
        savedDayIndex = today >= 0 && today < 7 ? today : 0;
    }

    // Guardar la fecha actual para reiniciar automáticamente en un nuevo día
    const lastVisitDate = getLastVisitDate();
    const todayDate = new Date().toLocaleDateString();

    if (lastVisitDate !== todayDate) {
        clearLocalStorage(); // Reiniciar los datos si es un nuevo día
        setLastVisitDate(todayDate);
    }

    // Crear las tabs para los días de la semana
    createDayTabs(days, savedDayIndex, function(dayIndex) {
        setSavedDayIndex(dayIndex);
        updatePanels(dayIndex, exercisesData, foodData);
        attachStatusButtonHandlers(dayIndex);
    });

    // Cargar los datos de ejercicios y comidas
    let exercisesData, foodData;

    fetch('ejercicios.json')
        .then(response => response.json())
        .then(data => {
            exercisesData = data.rutina;
            updatePanels(savedDayIndex, exercisesData, foodData);
            attachStatusButtonHandlers(savedDayIndex);
        });

    fetch('comida.json')
        .then(response => response.json())
        .then(data => {
            foodData = data.comidas;
            updatePanels(savedDayIndex, exercisesData, foodData);
            attachStatusButtonHandlers(savedDayIndex);
        });

    // Botón de restaurar día
    document.getElementById('restoreDayButton').addEventListener('click', function () {
        const dayIndex = getSavedDayIndex();
        clearStatusItems(dayIndex);
        updatePanels(dayIndex, exercisesData, foodData);
        attachStatusButtonHandlers(dayIndex);
    });
});

function updatePanels(dayIndex, exercisesData, foodData) {
    if (exercisesData && foodData) {
        const exercisePanel = document.getElementById('exercisePanel');
        const foodPanel = document.getElementById('foodPanel');

        // Limpiar los paneles
        exercisePanel.innerHTML = '';
        foodPanel.innerHTML = '';

        // Renderizar los ejercicios del día
        exercisesData[dayIndex].ejercicios.forEach((exercise, index) => {
            exercisePanel.innerHTML += renderExerciseItem(`Ejercicio ${index + 1}`, exercise, getStatusItems(dayIndex, 'exercise'));
        });

        // Renderizar las comidas del día
        Object.keys(foodData[dayIndex]).forEach(mealKey => {
            if (mealKey !== 'dia') {
                foodPanel.innerHTML += renderFoodItem(mealKey.charAt(0).toUpperCase() + mealKey.slice(1), foodData[dayIndex][mealKey], getStatusItems(dayIndex, 'food'));
            }
        });
    }
}