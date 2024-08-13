document.addEventListener("DOMContentLoaded", function () {
    // Detectar el día actual
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const today = new Date().getDay();
    const todayName = days[today];

    // Cargar el JSON de ejercicios
    fetch('ejercicios.json')
        .then(response => response.json())
        .then(data => {
            const exerciseTabs = document.getElementById('exerciseTabs');
            const exerciseContent = document.getElementById('exerciseContent');

            data.rutina.forEach((dia, index) => {
                const isActive = dia.dia === todayName ? 'active' : '';

                // Crear tabs para cada día
                const tabButton = document.createElement('li');
                tabButton.className = `nav-item`;
                tabButton.innerHTML = `
                    <a class="nav-link ${isActive}" id="exercise-tab-${index}" data-toggle="tab" href="#exercise-${index}" role="tab" aria-controls="exercise-${index}" aria-selected="${isActive === 'active'}">
                        ${dia.dia}
                    </a>
                `;
                exerciseTabs.appendChild(tabButton);

                // Crear contenido para cada día
                const tabPane = document.createElement('div');
                tabPane.className = `tab-pane fade show ${isActive}`;
                tabPane.id = `exercise-${index}`;
                tabPane.setAttribute('role', 'tabpanel');
                tabPane.innerHTML = `
                    <div class="exercise-details"><strong>Calentamiento:</strong> ${dia.calentamiento}</div>
                    <div class="exercise-details">
                        <strong>Ejercicios:</strong>
                        <ul>
                            ${dia.ejercicios.map(ejercicio => `
                                <li>
                                    <strong>${ejercicio.nombre}:</strong> ${ejercicio.peso}, ${ejercicio.numeroRepeticion} repeticiones, ${ejercicio.series} series, 
                                    Objetivo: ${ejercicio.objetivo}, Nivel: ${ejercicio.nivel}
                                </li>`).join('')}
                        </ul>
                    </div>
                    <div class="exercise-details"><strong>Cardio:</strong> ${dia.cardio}</div>
                    <div class="exercise-details"><strong>Estiramientos:</strong> ${dia.estiramientos}</div>
                `;
                exerciseContent.appendChild(tabPane);
            });
        });

    // Cargar el JSON de comidas
    fetch('comida.json')
        .then(response => response.json())
        .then(data => {
            const foodTabs = document.getElementById('foodTabs');
            const foodContent = document.getElementById('foodContent');

            data.comidas.forEach((comida, index) => {
                const isActive = comida.dia === todayName ? 'active' : '';

                // Crear tabs para cada día
                const tabButton = document.createElement('li');
                tabButton.className = `nav-item`;
                tabButton.innerHTML = `
                    <a class="nav-link ${isActive}" id="food-tab-${index}" data-toggle="tab" href="#food-${index}" role="tab" aria-controls="food-${index}" aria-selected="${isActive === 'active'}">
                        ${comida.dia}
                    </a>
                `;
                foodTabs.appendChild(tabButton);

                // Crear contenido para cada día
                const tabPane = document.createElement('div');
                tabPane.className = `tab-pane fade show ${isActive}`;
                tabPane.id = `food-${index}`;
                tabPane.setAttribute('role', 'tabpanel');
                tabPane.innerHTML = `
                    <div class="food-details"><strong>Desayuno:</strong> ${comida.desayuno}</div>
                    <div class="food-details"><strong>Media Mañana:</strong> ${comida.mediaManana}</div>
                    <div class="food-details"><strong>Almuerzo:</strong> ${comida.almuerzo}</div>
                    <div class="food-details"><strong>Merienda:</strong> ${comida.merienda}</div>
                    <div class="food-details"><strong>Cena:</strong> ${comida.cena}</div>
                    <div class="food-details"><strong>Antes de Dormir:</strong> ${comida.antesDeDormir}</div>
                `;
                foodContent.appendChild(tabPane);
            });
        });
});