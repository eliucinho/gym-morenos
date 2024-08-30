// js/common.js

// Función para obtener el estado del botón y la clase CSS correspondiente
function getButtonStateAndClass(state) {
    const buttonClass = state === 'hecho' ? 'btn-hecho' : state === 'omitido' ? 'btn-omitido' : 'btn-pendiente';
    const buttonIcon = state === 'omitido' ? `<i class="fas fa-times"></i>` : `<i class="fas fa-check"></i>`;
    return { buttonClass, buttonIcon };
}

// Función para crear un elemento de medios (video o imagen)
function createMediaElement(item) {
    if (item.video && item.video !== "") {
        return item.video.endsWith('.mp4') ?
            `<video class="rounded-lg w-100 mt-2" controls>
                <source src="${item.video}" type="video/mp4">
             </video>` :
            `<iframe class="w-100 mt-2" height="150" src="https://www.youtube.com/embed/${item.video}" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    } else if (item.foto && item.foto !== "") {
        return `<img src="${item.foto}" alt="${item.nombre}" class="rounded-lg w-100 mt-2">`;
    }
    return '';
}

// Función general para renderizar elementos
function renderItem(label, item, dayIndex, statusItems, getSummaryHtml, getDetailsHtml, titleClass = '') {
    const state = statusItems[item.nombre] || 'pendiente';
    const { buttonClass, buttonIcon } = getButtonStateAndClass(state);
    const mediaElement = createMediaElement(item);
    const summaryHtml = getSummaryHtml(item);
    const detailsHtml = getDetailsHtml(item, mediaElement);

    return `
        <div class="item-row mb-3">
            <div class="d-flex justify-content-between align-items-center p-2 bg-white shadow-sm rounded">
                <div class="flex-grow-1 ${titleClass}" data-toggle="collapse" data-target="#collapse-${item.nombre.replace(/\s+/g, '')}" aria-expanded="false" aria-controls="collapse-${item.nombre.replace(/\s+/g, '')}">
                    <strong>${label ? `${label}: ` : ''}${item.nombre}</strong><br>
                    ${summaryHtml}
                </div>
                <button class="btn status-button ${buttonClass} rounded-circle ml-2" data-type="${label.toLowerCase()}" data-name="${item.nombre}" data-state="${state}" data-day="${dayIndex}">
                    ${buttonIcon}
                </button>
            </div>
            <div class="collapse mt-1" id="collapse-${item.nombre.replace(/\s+/g, '')}">
                <div class="bg-light p-2 rounded">
                    ${detailsHtml}
                </div>
            </div>
            <hr>
        </div>
    `;
}

// Manejador de eventos para los botones de estado
document.addEventListener('click', function(event) {
    if (event.target.closest('.status-button')) {
        const button = event.target.closest('.status-button');
        const itemType = button.getAttribute('data-type');
        const itemName = button.getAttribute('data-name');
        const currentState = button.getAttribute('data-state');
        const dayIndex = button.getAttribute('data-day'); // Obtén el día específico del ítem

        // Lógica de cambio de estado: pendiente -> hecho -> omitido -> pendiente
        let newState;
        if (currentState === 'pendiente') {
            newState = 'hecho';
        } else if (currentState === 'hecho') {
            newState = 'omitido';
        } else {
            newState = 'pendiente';
        }

        // Actualiza el estado del botón
        button.setAttribute('data-state', newState);
        const { buttonClass, buttonIcon } = getButtonStateAndClass(newState);
        button.className = `btn status-button ${buttonClass} rounded-circle`;
        button.innerHTML = buttonIcon;

        // Guarda el estado actualizado en localStorage con la clave única
        saveStatusItem(itemType, dayIndex, itemName, newState);
    }
});