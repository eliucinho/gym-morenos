// js/renderExerciseItem.js

function renderExerciseItem(label, item, dayIndex, itemId) {
    if (!item) {
        console.warn(`Ejercicio no encontrado: ${label}`);
        return ''; // Retorna vacío si no hay ítem
    }

    const state = getStatusItem(itemId); // Usa el ID único para obtener el estado

    // Aplicar clase 'tachado' si el estado es 'hecho'
    const titleClass = state === 'hecho' ? 'tachado' : '';

    return renderItem(itemId, label, item, dayIndex, state, getExerciseSummaryHtml, getExerciseDetailsHtml, titleClass);
}

// js/renderFoodItem.js

function renderFoodItem(title, item, dayIndex, itemId) {
    if (!item) {
        console.warn(`Comida no encontrada: ${title}`);
        return ''; // Retorna vacío si no hay ítem
    }

    const state = getStatusItem(itemId); // Usa el ID único para obtener el estado

    // Aplicar clase 'tachado' si el estado es 'hecho'
    const titleClass = state === 'hecho' ? 'tachado' : '';

    return renderItem(itemId, title, item, dayIndex, state, getFoodSummaryHtml, getFoodDetailsHtml, titleClass);
}

function getExerciseSummaryHtml(item) {
    return `
        <span class="text-muted">
        ${item.objetivo ? `- ${item.objetivo}: ` : ''}
        ${item.numeroRepeticion ? ` ${item.numeroRepeticion} x` : ''}
        ${item.series ? ` ${item.series} x` : ''}
        ${item.peso != 'N/A' ? `${item.peso}` : ''}
        ${item.tiempo ? `${item.tiempo}` : ''}
    </span>
    `;
}

function getExerciseDetailsHtml(item, mediaElement) {
    return `
    <div class="mt-2">
        ${item.tiempo ? `- Tiempo: ${item.tiempo} minutos<br>` : ''}
        ${item.numeroRepeticion ? `- Repeticiones: ${item.numeroRepeticion}<br>` : ''}
        ${item.series ? `- Series: ${item.series}<br>` : ''}
        - Objetivo: ${item.objetivo || 'N/A'}<br>
        - Nivel: ${item.nivel || 'N/A'}
    </div>
    ${mediaElement}
    `;
}