let exercisesData, foodData;

function attachStatusButtonHandlers(dayIndex) {
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('status-button')) {
            const button = event.target;
            const itemType = button.getAttribute('data-type');
            const itemName = button.getAttribute('data-name');
            const currentState = button.getAttribute('data-state');

            let newState;
            if (currentState === 'pendiente') {
                newState = 'hecho';
            } else if (currentState === 'hecho') {
                newState = 'omitido';
            } else {
                newState = 'pendiente';
            }

            console.log(`Item Type: ${itemType}, Item Name: ${itemName}, New State: ${newState}`);

            saveStatusItem(itemType, dayIndex, itemName, newState);
            updatePanels(dayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    let savedDayIndex = getSavedDayIndex();
    if (savedDayIndex !== null) {
        savedDayIndex = parseInt(savedDayIndex);
    } else {
        const today = new Date().getDay() - 1;
        savedDayIndex = today >= 0 && today < 7 ? today : 0;
    }

    const lastVisitDate = getLastVisitDate();
    const todayDate = new Date().toLocaleDateString();

    if (lastVisitDate !== todayDate) {
        clearLocalStorage();
        setLastVisitDate(todayDate);
    }

    const fetchData = async () => {
        const exercisesResponse = await fetch('ejercicios.json');
        const exercises = await exercisesResponse.json();
        exercisesData = exercises.rutina;

        const foodResponse = await fetch('comida.json');
        const food = await foodResponse.json();
        foodData = food.comidas;

        const updateAndAttachHandlers = (dayIndex) => {
            setSavedDayIndex(dayIndex);
            updatePanels(dayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem);
            attachStatusButtonHandlers(dayIndex);
        };

        createDayTabs(days, savedDayIndex, updateAndAttachHandlers);

        updateAndAttachHandlers(savedDayIndex);
    };

    fetchData();

    document.getElementById('restoreDayButton').addEventListener('click', function () {
        const dayIndex = getSavedDayIndex();
        clearStatusItems(dayIndex);
        updatePanels(dayIndex, exercisesData, foodData, renderExerciseItem, renderFoodItem);
        attachStatusButtonHandlers(dayIndex);
    });
});