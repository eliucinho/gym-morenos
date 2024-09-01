// js/common.js

// Función para crear un elemento de medios (video o imagen)
function createMediaElement(item) {
    if (item.video && item.video !== "") {
        if (item.video.endsWith('.mp4')) {
            // Video MP4
            return `<video class="rounded-lg w-100 mt-2" controls>
                        <source src="${item.video}" type="video/mp4">
                    </video>`;
        } else if (item.video.endsWith('.gif')) {
            // Imagen GIF
            return `<img src="${item.video}" alt="${item.nombre}" class="rounded-lg w-100 mt-2">`;
        } else if (item.video.includes('youtube.com') || item.video.includes('youtu.be')) {
            // Video de YouTube
            const videoId = extractYouTubeVideoId(item.video);
            if (videoId) {
                return `<iframe class="w-100 mt-2" height="315" src="https://www.youtube.com/embed/${videoId}" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            }
        } else {
            // Otros tipos de video
            return `<iframe class="w-100 mt-2" height="150" src="${item.video}" 
                        title="Video player" frameborder="0" 
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        }
    } else if (item.foto && item.foto !== "") {
        // Imagen
        return `<img src="${item.foto}" alt="${item.nombre}" class="rounded-lg w-100 mt-2">`;
    }
    return '';
}

// Función para extraer el ID del video de YouTube
function extractYouTubeVideoId(url) {
    // Regex para capturar el ID de un enlace de YouTube en diferentes formatos
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
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