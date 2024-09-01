// js/common.js

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
function renderItem(itemId, label, item, dayIndex, state, getSummaryHtml, getDetailsHtml, titleClass = '') {
    const { buttonClass, buttonIcon } = getButtonStateAndClass(state);
    const mediaElement = createMediaElement(item);
    const summaryHtml = getSummaryHtml(item);
    const detailsHtml = getDetailsHtml(item, mediaElement); 

    const result = `
    <div class="item-row mb-3">
        <div class="d-flex justify-content-between align-items-center p-2 bg-white shadow-sm rounded">
            <div class="flex-grow-1 ${titleClass}" data-toggle="collapse" data-target="#collapse-${itemId}" aria-expanded="false" aria-controls="collapse-${itemId}">
                <strong>${label ? `${label}: ` : ''}${item.nombre}</strong><br>
                ${summaryHtml}
            </div>
            <button class="btn status-button ${buttonClass} rounded-circle ml-2" data-id="${itemId}" data-type="${label.toLowerCase()}" data-name="${item.nombre}" data-state="${state}" data-day="${dayIndex}">
                ${buttonIcon}
            </button>
        </div>
        <div class="collapse mt-1" id="collapse-${itemId}">
            <div class="bg-light p-2 rounded">
                ${detailsHtml}
            </div>
        </div>
        <hr>
    </div>
`;
    return result;
}
function getButtonStateAndClass(state) {
    let buttonClass, buttonIcon;
    switch (state) {
        case 'pendiente':
            buttonClass = 'btn-warning';
            buttonIcon = '<i class="fas fa-hourglass-start"></i>';
            break;
        case 'hecho':
            buttonClass = 'btn-success';
            buttonIcon = '<i class="fas fa-check"></i>';
            break;
        case 'omitido':
            buttonClass = 'btn-danger';
            buttonIcon = '<i class="fas fa-times"></i>';
            break;
    }
    return { buttonClass, buttonIcon };
}