//js/main.js
document.addEventListener("DOMContentLoaded", function () {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    // Función para obtener el índice del día actual
    function getTodayIndex() {
        const today = new Date().getDay();
        // Ajusta el índice para que sea correcto para tu semana (Lunes = 0, Domingo = 6)
        return today === 0 ? 6 : today - 1; // Domingo (0) se convierte en 6 (Sábado)
    }

    // Función para obtener el índice del día guardado en el almacenamiento local
    function getSavedDayIndex() {
        return parseInt(localStorage.getItem('savedDayIndex'), 10);
    }

    // Función para guardar el índice del día en el almacenamiento local
    function setSavedDayIndex(index) {
        localStorage.setItem('savedDayIndex', index);
    }

    // Calcula el índice del día actual y el índice guardado
    let savedDayIndex = getSavedDayIndex();
    if (savedDayIndex === null || isNaN(savedDayIndex)) {
        savedDayIndex = getTodayIndex(); // Usa el índice del día actual si no hay índice guardado
    }

    const lastVisitDate = getLastVisitDate();
    const todayDate = new Date().toLocaleDateString();

    if (lastVisitDate !== todayDate) {
        clearLocalStorage();
        setLastVisitDate(todayDate);
    }

    let exercisesData, foodData;

    const fetchData = async () => {
        const exercisesResponse = await fetch('ejercicios.json');
        const exercises = await exercisesResponse.json();
        exercisesData = exercises.rutina;

        const foodResponse = await fetch('comida.json');
        const food = await foodResponse.json();
        foodData = food.comidas;

        // Crea las pestañas y establece el manejador de selección
        createDayTabs(days, savedDayIndex, (dayIndex) => {
            setSavedDayIndex(dayIndex);
            updatePanels(dayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem);
            attachStatusButtonHandlers(dayIndex, exercisesData, foodData);
        });

        // Actualiza los paneles para el día seleccionado
        updatePanels(savedDayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem);
    };

    fetchData();

    document.getElementById('restoreDayButton').addEventListener('click', function () {
        const dayIndex = getSavedDayIndex();
        clearStatusItems(dayIndex);
        updatePanels(dayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem);
        attachStatusButtonHandlers(dayIndex, exercisesData, foodData);
    });
});