// js/main.js

document.addEventListener("DOMContentLoaded", async function () {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    // Inicializa el índice del día
    const savedDayIndex = initializeDayIndex();

    // Carga los datos de ejercicios y comida
    const { exercisesData, foodData } = await fetchData();

    if (exercisesData.length === 0 || foodData.length === 0) {
        console.error("No se pudieron cargar los datos.");
        return;
    }

    // Actualiza el dashboard para el día seleccionado
    updateDashboard(savedDayIndex, exercisesData, foodData);

    console.log("se volvio a crear la tab");
    // Crea las pestañas y establece el manejador de selección
    createDayTabs(days, savedDayIndex, (dayIndex) => {
        setSavedDayIndex(dayIndex);
        console.log("Update panels: dayIndex:", dayIndex);
        updatePanels(dayIndex, exercisesData, foodData); // Actualiza paneles al cambiar de día

        console.log("Cambiando a pestaña del día: dayIndex: ", dayIndex);
        updateDashboard(dayIndex, exercisesData, foodData);
    });

    // Actualiza los paneles iniciales y configura los botones de estado
    console.log("Update main savedDayIndex:", savedDayIndex);
    updatePanels(savedDayIndex, exercisesData, foodData);

    // Configura la funcionalidad de alternancia de pestañas
    setupTabSwitching();
});