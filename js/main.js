document.addEventListener("DOMContentLoaded", async function () {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    // Inicializa el índice del día
    const savedDayIndex = initializeDayIndex();

    // Muestra la zona horaria en la esquina superior derecha
    document.getElementById('timeZoneDisplay').innerText = `${getTimeZone()}`;

    // Carga los datos de ejercicios y comida
    const { exercisesData, foodData } = await fetchData();

    if (exercisesData.length === 0 || foodData.length === 0) {
        console.error("No se pudieron cargar los datos.");
        return;
    }

    console.log("se volvió a crear la tab");
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

    // Actualiza el dashboard para el día seleccionado
    updateDashboard(savedDayIndex, exercisesData, foodData);

    // Configura la funcionalidad de alternancia de pestañas
    setupTabSwitching();

    // Desplaza la pestaña activa al centro si es viernes o domingo y la pantalla es pequeña
    if ((savedDayIndex === 4 || savedDayIndex === 6) && window.innerWidth < 768) {
        const activeTab = document.querySelector('.nav-link.active');
        if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    }

    // Inicializa el título del día
    initializeDayTitle();
});

// Función para obtener la zona horaria
function getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Inicializa el contenido del día de hoy
function initializeDayTitle() {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const todayDayTitle = document.getElementById('todayDayTitle');
    const savedDayIndex = getSavedDayIndex();
    const todayDay = new Date().getDay();
    const currentDayIndex = todayDay === 0 ? 6 : todayDay - 1; // Ajusta para que Lunes sea 0 y Domingo sea 6
    const timeZone = getTimeZone();

    // Mostrar solo el día de hoy si es el mismo que el seleccionado
    if (savedDayIndex && parseInt(savedDayIndex) === currentDayIndex) {
        todayDayTitle.innerText = `¡${days[currentDayIndex]}!`;
    } else if (savedDayIndex) {
        todayDayTitle.innerText = `Día seleccionado: ${days[savedDayIndex]}, Hoy es ${days[currentDayIndex]} (${timeZone})`;
    } else {
        todayDayTitle.innerText = `Hoy es ${days[currentDayIndex]} (${timeZone})`;
    }
}
