function renderCheckableItem(label, item, statusItems, type) {
    const state = statusItems[item] || 'pendiente';
    const buttonClass = state === 'hecho' ? 'btn-hecho' : state === 'omitido' ? 'btn-omitido' : 'btn-pendiente';
    const buttonText = state === 'hecho' ? 'Hecho' : state === 'omitido' ? 'Omitido' : 'Pendiente';
    const textClass = state === 'hecho' || state === 'omitido' ? 'tachado' : '';

    return `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="${textClass}"><strong>${label}:</strong> ${item}</span>
            <button class="btn status-button ${buttonClass}" data-type="${type}" data-name="${item}" data-state="${state}">${buttonText}</button>
        </div>
    `;
}

function attachStatusButtonHandlers(dayIndex) {
    document.querySelectorAll('.status-button').forEach(button => {
        button.addEventListener('click', function () {
            const itemType = this.dataset.type;
            const itemName = this.dataset.name;
            const currentState = this.dataset.state;

            let nextState, nextClass, nextText;
            if (currentState === 'pendiente') {
                nextState = 'hecho';
                nextClass = 'btn-hecho';
                nextText = 'Hecho';
            } else if (currentState === 'hecho') {
                nextState = 'omitido';
                nextClass = 'btn-omitido';
                nextText = 'Omitido';
            } else {
                nextState = 'pendiente';
                nextClass = 'btn-pendiente';
                nextText = 'Pendiente';
            }

            this.dataset.state = nextState;
            this.className = `btn status-button ${nextClass}`;
            this.textContent = nextText;

            if (nextState === 'hecho' || nextState === 'omitido') {
                this.previousElementSibling.classList.add('tachado');
            } else {
                this.previousElementSibling.classList.remove('tachado');
            }

            saveStatusItem(itemType, dayIndex, itemName, nextState);
        });
    });
}