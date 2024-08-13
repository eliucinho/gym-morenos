document.addEventListener("DOMContentLoaded", function () {
    // Cambiar pestañas
    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach(link => {
        link.addEventListener("click", function () {
            tabLinks.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const tabContent = document.querySelectorAll(".tab-content");
            tabContent.forEach(content => content.classList.remove("active"));
            document.getElementById(this.dataset.tab).classList.add("active");
        });

                     });

// Cargar el JSON de comida
fetch('comida.json')
    .then(response => response.json())
    .then(data => {
        const comidaTable = document.getElementById('comidaTable');
        data.comidas.forEach(comida => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${comida.comida}</td>
                <td>${comida.semana}</td>
                <td>${comida.finDeSemana}</td>
            `;
            comidaTable.appendChild(row);
        });
    });

// Cargar el JSON de ejercicios
fetch('ejercicios.json')
    .then(response => response.json())
    .then(data => {
        const ejercicioTable = document.getElementById('ejercicioTable');
        
        data.rutina.forEach(dia => {
            const row = document.createElement('tr');
            let ejerciciosHTML = '';

            dia.ejercicios.forEach(ejercicio => {
                ejerciciosHTML += `
                    <strong>Ejercicio:</strong> ${ejercicio.nombre}<br>
                    <strong>Peso:</strong> ${ejercicio.peso}<br>
                    <strong>Repeticiones:</strong> ${ejercicio.numeroRepeticion}<br>
                    <strong>Series:</strong> ${ejercicio.series}<br>
                    <strong>Objetivo:</strong> ${ejercicio.objetivo}<br>
                    <strong>Nivel:</strong> ${ejercicio.nivel}<br><br>
                `;
            });

            row.innerHTML = `
                <td>${dia.dia}</td>
                <td>${dia.calentamiento}</td>
                <td>${ejerciciosHTML}</td>
                <td>${dia.cardio}</td>
                <td>${dia.estiramientos}</td>
            `;
            ejercicioTable.appendChild(row);
        });
    });
})