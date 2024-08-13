function createDayTabs(days, savedDayIndex, onSelectDay) {
    const dayTabs = document.getElementById('dayTabs');
    days.forEach((day, index) => {
        const isActive = index === savedDayIndex ? 'active' : '';
        const tabButton = document.createElement('li');
        tabButton.className = `nav-item`;
        tabButton.innerHTML = `
            <a class="nav-link ${isActive}" id="tab-${index}" data-toggle="tab" href="#" role="tab" data-day="${index}">
                ${day}
            </a>
        `;
        tabButton.querySelector('a').addEventListener('click', () => {
            onSelectDay(index);
        });
        dayTabs.appendChild(tabButton);
    });
}