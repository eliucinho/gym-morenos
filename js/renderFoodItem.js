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