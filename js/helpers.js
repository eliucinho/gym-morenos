//js/helpers.js
function determineActivityForTime() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 9) return "🏋️‍♂️ Calentamiento matutino";
    if (hour >= 9 && hour < 12) return "💪 Ejercicio de fuerza";
    if (hour >= 12 && hour < 15) return "🍽️ Almuerzo saludable";
    if (hour >= 15 && hour < 18) return "🏃‍♂️ Cardio de tarde";
    if (hour >= 18 && hour < 21) return "🧘‍♀️ Estiramientos y relajación";
    return "🛏️ Descanso";
}
