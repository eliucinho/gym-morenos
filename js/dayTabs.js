//js/dayTab.js
function createDayTabs(days, savedDayIndex, onSelectDay) {
    const dayTabs = document.getElementById('dayTabs');
    dayTabs.innerHTML = ''; // Limpia las pestañas anteriores

    days.forEach((day, index) => {
        const isActive = index === savedDayIndex ? 'active' : '';
        const tabButton = document.createElement('li');
        tabButton.className = 'nav-item';

        // Crea el HTML para la pestaña
        tabButton.innerHTML = `
            <a class="nav-link ${isActive}" id="tab-${index}" data-toggle="tab" href="#" role="tab" data-day="${index}">
                ${day}
            </a>
        `;

        // Añade el manejador de eventos para el clic en la pestaña
        tabButton.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto del enlace
            onSelectDay(index);
        });

        dayTabs.appendChild(tabButton);
    });

    // Opcional: Actualiza la pestaña activa si es necesario
    const activeTab = document.querySelector('.nav-link.active');
    if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
}