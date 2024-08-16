function renderExerciseItem(label, item, statusItems) {
    const state = statusItems[item.nombre] || 'pendiente';
    const buttonClass = state === 'hecho' ? 'btn-hecho' : state === 'omitido' ? 'btn-omitido' : 'btn-pendiente';
    const buttonText = state === 'hecho' ? 'Hecho' : state === 'omitido' ? 'Omitido' : 'Pendiente';
    const textClass = state === 'hecho' || state === 'omitido' ? 'tachado' : '';

    let mediaElement = '';
    if (item.video && item.video !== "") {
        mediaElement = item.video.endsWith('.mp4') ?
            `<video class="rounded-lg w-100" controls>
                <source src="${item.video}" type="video/mp4">
             </video>` :
            `<iframe class="w-100" height="150" src="https://www.youtube.com/embed/${item.video}&controls=0" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }

    let contentHtml = '';
    if (item.tiempo && item.tiempo !== "") {
        contentHtml = `
            <strong>${label}: ${item.nombre}</strong><br>
            <span class="${textClass}">
                - tiempo: ${item.tiempo}<br>
                - objetivo: ${item.objetivo || 'N/A'}<br>
                - nivel: ${item.nivel || 'N/A'}
            </span>
        `;
    } else {
        contentHtml = `
            <strong>${label}: ${item.nombre}</strong><br>
            <span class="${textClass}">
                - peso: ${item.peso || 'N/A'}<br>
                - repeticiones: ${item.numeroRepeticion || 'N/A'}<br>
                - series: ${item.series || 'N/A'}<br>
                - objetivo: ${item.objetivo || 'N/A'}<br>
                - nivel: ${item.nivel || 'N/A'}
            </span>
        `;
    }

    return `
        <div class="item-row mb-2">
            <div class="row">
                <div class="col-12 col-md-6">
                    ${contentHtml}
                </div>
                <div class="col-12 col-md-4">
                    ${mediaElement}
                </div>
                <div class="col-12 col-md-2 d-flex align-items-center justify-content-center mt-2 mt-md-0">
                    <button class="btn status-button ${buttonClass}" data-type="exercise" data-name="${item.nombre}" data-state="${state}">${buttonText}</button>
                </div>
            </div>
        </div>
        <hr>
    `;
}