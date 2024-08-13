document.addEventListener("DOMContentLoaded", function () {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const today = new Date().getDay() - 1; // Lunes es 0, Domingo es 6
    const todayIndex = today >= 0 && today < 7 ? today : 0; // Si es domingo, ajusta para que el array comience en lunes

    // Crear las tabs para los días de la semana
    const dayTabs = document.getElementById('dayTabs');
    days.forEach((day, index) => {
        const isActive = index === todayIndex ? 'active' : '';
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
            exercisesData = data.rutina; // Incluir todos los días de la semana
            updatePanels(todayIndex);
        });

    fetch('comida.json')
        .then(response => response.json())
        .then(data => {
            foodData = data.comidas; // Incluir todos los días de la semana
            updatePanels(todayIndex);
        });

    // Actualizar los paneles cuando se selecciona un día
    dayTabs.addEventListener('click', function (e) {
        if (e.target && e.target.dataset.day !== undefined) {
            const dayIndex = parseInt(e.target.dataset.day);
            updatePanels(dayIndex);
        }
    });

    function updatePanels(dayIndex) {
        if (exercisesData && foodData) {
            const exercisePanel = document.getElementById('exercisePanel');
            const foodPanel = document.getElementById('foodPanel');

            // Actualizar panel de ejercicios
            const dayExercises = exercisesData[dayIndex];
            exercisePanel.innerHTML = `
                <div><strong>Calentamiento:</strong> ${dayExercises.calentamiento}</div>
                <div>
                    <strong>Ejercicios:</strong>
                    <ul>
                        ${dayExercises.ejercicios.map(ejercicio => `
                            <li><strong>${ejercicio.nombre}:</strong> ${ejercicio.peso}, ${ejercicio.numeroRepeticion} repeticiones, ${ejercicio.series} series, Objetivo: ${ejercicio.objetivo}, Nivel: ${ejercicio.nivel}</li>
                        `).join('')}
                    </ul>
                </div>
                <div><strong>Cardio:</strong> ${dayExercises.cardio}</div>
                <div><strong>Estiramientos:</strong> ${dayExercises.estiramientos}</div>
            `;

            // Actualizar panel de comidas
            const dayFood = foodData[dayIndex];
            foodPanel.innerHTML = `
                <div><strong>Desayuno:</strong> ${dayFood.desayuno}</div>
                <div><strong>Media Mañana:</strong> ${dayFood.mediaManana}</div>
                <div><strong>Almuerzo:</strong> ${dayFood.almuerzo}</div>
                <div><strong>Merienda:</strong> ${dayFood.merienda}</div>
                <div><strong>Cena:</strong> ${dayFood.cena}</div>
                <div><strong>Antes de Dormir:</strong> ${dayFood.antesDeDormir}</div>
            `;
        }
    }
});