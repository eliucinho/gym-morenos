document.addEventListener("DOMContentLoaded", function () {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    // Obtener el índice del día guardado o el día actual
    let savedDayIndex = localStorage.getItem('selectedDayIndex');
    if (savedDayIndex !== null) {
        savedDayIndex = parseInt(savedDayIndex);
    } else {
        const today = new Date().getDay() - 1;
        savedDayIndex = today >= 0 && today < 7 ? today : 0;
    }

    // Guardar la fecha actual para reiniciar automáticamente en un nuevo día
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    const todayDate = new Date().toLocaleDateString();

    if (lastVisitDate !== todayDate) {
        localStorage.clear(); // Reiniciar los datos si es un nuevo día
        localStorage.setItem('lastVisitDate', todayDate);
    }

    // Crear las tabs para los días de la semana
    const dayTabs = document.getElementById('dayTabs');
    days.forEach((day, index) => {
        const isActive = index === savedDayIndex ? 'active' : '';
        const tabButton = document.createElement('li');
        tabButton.className = `nav-item`;
        tabButton.innerHTML = `
            <a class="nav-link ${isActive}" id="tab-${index}" data-toggle="tab" href="#" role="tab" data-day="${index}">
                ${day}
            </a>
        `;
        dayTabs.appendChild(tabButton);
    });

    // Cargar los datos de ejercicios y comidas
    let exercisesData, foodData;

    fetch('ejercicios.json')
        .then(response => response.json())
        .then(data => {
            exercisesData = data.rutina;
            updatePanels(savedDayIndex);
        });

    fetch('comida.json')
        .then(response => response.json())
        .then(data => {
            foodData = data.comidas;
            updatePanels(savedDayIndex);
        });

    // Actualizar los paneles cuando se selecciona un día
    dayTabs.addEventListener('click', function (e) {
        if (e.target && e.target.dataset.day !== undefined) {
            const dayIndex = parseInt(e.target.dataset.day);
            localStorage.setItem('selectedDayIndex', dayIndex);
            updatePanels(dayIndex);
        }
    });

    // Botón de restaurar día
    document.getElementById('restoreDayButton').addEventListener('click', function () {
        const dayIndex = localStorage.getItem('selectedDayIndex');
        localStorage.removeItem(`completedExercises-${dayIndex}`);
        localStorage.removeItem(`completedFood-${dayIndex}`);
        updatePanels(dayIndex);
    });

    function updatePanels(dayIndex) {
        if (exercisesData && foodData) {
            const exercisePanel = document.getElementById('exercisePanel');
            const foodPanel = document.getElementById('foodPanel');

            const completedExercises = JSON.parse(localStorage.getItem(`completedExercises-${dayIndex}`)) || [];
            const completedFood = JSON.parse(localStorage.getItem(`completedFood-${dayIndex}`)) || [];

            const dayExercises = exercisesData[dayIndex];
            exercisePanel.innerHTML = `
                ${renderCheckableItem("Calentamiento", dayExercises.calentamiento, completedExercises, "exercise")}
                ${dayExercises.ejercicios.map((ejercicio, i) => renderCheckableItem(`Ejercicio ${i+1}`, `${ejercicio.nombre}: ${ejercicio.peso}, ${ejercicio.numeroRepeticion} repeticiones, ${ejercicio.series} series, Objetivo: ${ejercicio.objetivo}, Nivel: ${ejercicio.nivel}`, completedExercises, "exercise")).join('')}
                ${renderCheckableItem("Cardio", dayExercises.cardio, completedExercises, "exercise")}
                ${renderCheckableItem("Estiramientos", dayExercises.estiramientos, completedExercises, "exercise")}
            `;

            const dayFood = foodData[dayIndex];
            foodPanel.innerHTML = `
                ${renderCheckableItem("Desayuno", dayFood.desayuno, completedFood, "food")}
                ${renderCheckableItem("Media Mañana", dayFood.mediaManana, completedFood, "food")}
                ${renderCheckableItem("Almuerzo", dayFood.almuerzo, completedFood, "food")}
                ${renderCheckableItem("Merienda", dayFood.merienda, completedFood, "food")}
                ${renderCheckableItem("Cena", dayFood.cena, completedFood, "food")}
                ${renderCheckableItem("Antes de Dormir", dayFood.antesDeDormir, completedFood, "food")}
            `;

            // Añadir eventos de clic a los botones de "Hecho"
            document.querySelectorAll('.check-button').forEach(button => {
                button.addEventListener('click', function () {
                    const itemType = this.dataset.type;
                    const itemName = this.dataset.name;

                    if (itemType === "exercise") {
                        saveCompletedItem(`completedExercises-${dayIndex}`, itemName);
                    } else {
                        saveCompletedItem(`completedFood-${dayIndex}`, itemName);
                    }

                    // Ocultar el elemento del DOM
                    this.parentElement.style.display = 'none';
                });
            });
        }
    }

    function renderCheckableItem(label, item, completedItems, type) {
        if (completedItems.includes(item)) {
            return '';
        }
        return `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span><strong>${label}:</strong> ${item}</span>
                <button class="btn btn-success btn-sm check-button" data-type="${type}" data-name="${item}">Hecho</button>
            </div>
        `;
    }

    function saveCompletedItem(key, itemName) {
        let completedItems = JSON.parse(localStorage.getItem(key)) || [];
        completedItems.push(itemName);
        localStorage.setItem(key, JSON.stringify(completedItems));
    }
});