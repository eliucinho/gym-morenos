// js/fetchData.js

async function fetchData() {
    try {
        const exercisesResponse = await fetch('ejercicios.json');
        const exercises = await exercisesResponse.json();
        const exercisesData = exercises.rutina || [];

        const foodResponse = await fetch('comida.json');
        const food = await foodResponse.json();
        const foodData = food.comidas || [];

        // Obtener el día actual para generar los IDs
        const dayIndex = initializeDayIndex();
        assignUniqueIdsExersise(exercisesData, 'exercise', dayIndex);
        assignUniqueIds(foodData, 'food', dayIndex);

        // Guarda los datos en localStorage
        saveExerciseListData(exercisesData);
        saveFoodListData(foodData);

        return { exercisesData, foodData };
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        return { exercisesData: [], foodData: [] };
    }
}

// Función para asignar IDs únicos a cada ítem
function assignUniqueIdsExersise(items, type, dayIndex) {
    items.forEach((item, index) => {
        item.ejercicios.forEach((ejercicio, i) => {
            if (ejercicio) {
                // Asigna un ID único basado en el día, tipo y el índice del ítem
                ejercicio.id = `${type}-${dayIndex}-${i + 1}`;
                //console.info(`Asignando ID exercise: ${ejercicio.id} para ${type}`);
            } else {
                console.warn(`ejercicio no encontrado para ${type} en índice ${i}`);
            }
        });
    
    });
}
function assignUniqueIds(items, type, dayIndex) {

    items.forEach((item, index) => {
        if (item) {
            // Asigna un ID único basado en el día, tipo y el índice del ítem
            item.desayuno.id = `${type}-${dayIndex}-${1}`;
            item.mediaManana.id = `${type}-${dayIndex}-${2}`;
            item.almuerzo.id = `${type}-${dayIndex}-${3}`;
            item.merienda.id = `${type}-${dayIndex}-${4}`;
            item.cena.id = `${type}-${dayIndex}-${5}`;
            item.antesDeDormir.id = `${type}-${dayIndex}-${6}`;
            console.info(`Asignando ID food: ${item.id} para ${type}`);
        } else {
            console.warn(`Item no encontrado para ${type} en índice ${index}`);
        }
    });
}

function initializeDayIndex() {
    let savedDayIndex = getSavedDayIndex();
    if (isNaN(savedDayIndex)) {
        savedDayIndex = new Date().getDay();
        savedDayIndex = savedDayIndex === 0 ? 6 : savedDayIndex - 1; // Ajusta para que Lunes sea 0 y Domingo sea 6
        setSavedDayIndex(savedDayIndex);
    }
    return savedDayIndex;
}