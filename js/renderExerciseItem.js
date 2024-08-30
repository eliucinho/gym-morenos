// js/renderExerciseItem.js

function renderExerciseItem(label, item, statusItems) {
    const dayIndex = getSavedDayIndex();
    const savedStatusItems = getStatusItems('exercise', dayIndex);
    const state = savedStatusItems[item.nombre] || statusItems[item.nombre] || 'pendiente';

    // Aplicar clase 'tachado' si el estado es 'hecho'
    const titleClass = state === 'hecho' ? 'tachado' : '';

    return renderItem(label, item, { [item.nombre]: state }, getExerciseSummaryHtml, getExerciseDetailsHtml, titleClass);
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