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

    // Crea las pestañas y establece el manejador de selección
    createDayTabs(days, savedDayIndex, (dayIndex) => {
        setSavedDayIndex(dayIndex);
        updatePanels(dayIndex, exercisesData, foodData); // Actualiza paneles al cambiar de día
        attachStatusButtonHandlers(dayIndex, exercisesData, foodData); 

        console.log("Cambiando a pestaña del día:", dayIndex);
        updateDashboard(dayIndex, exercisesData, foodData);
    });

    // Actualiza los paneles iniciales y configura los botones de estado
    updatePanels(savedDayIndex, exercisesData, foodData);
    attachStatusButtonHandlers(savedDayIndex, exercisesData, foodData);

    // Configura la funcionalidad de alternancia de pestañas
    setupTabSwitching();
});