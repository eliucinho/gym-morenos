// js/renderFoodItem.js

function renderFoodItem(label, tittle, item, dayIndex, statusItems) {
    const state = getStatusItem(label, dayIndex, item.nombre);

    // Aplicar clase 'tachado' si el estado es 'hecho'
    const titleClass = state === 'hecho' ? 'tachado' : '';

    return renderItem(label, item, dayIndex, state, getFoodSummaryHtml, getFoodDetailsHtml, titleClass);
}

function getFoodSummaryHtml(item) {
    const ingredientsHtml = item.ingredientes && item.ingredientes.length > 0 
        ? item.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')
        : '<li>N/A</li>';
    
    return `
        <span>
            Ingredientes:
            <ul class="mb-0">
                ${ingredientsHtml}
            </ul>
        </span>
    `;
}

function getFoodDetailsHtml(item, mediaElement) {
    return `
        ${mediaElement}
    `;
}