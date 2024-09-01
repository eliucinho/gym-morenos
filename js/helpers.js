// js/helpers.js
function determineActivityForTime() {
    let activity = ""; // Cambiar a let para permitir reasignación
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 9) {
        activity = "🏋️‍♂️ Calentamiento matutino";
    } else if (hour >= 9 && hour < 12) {
        activity = "💪 Ejercicio de fuerza";
    } else if (hour >= 12 && hour < 15) {
        activity = "🍽️ Almuerzo saludable";
    } else if (hour >= 15 && hour < 18) {
        activity = "🏃‍♂️ Cardio de tarde";
    } else if (hour >= 18 && hour < 21) {
        activity = "🧘‍♀️ Estiramientos y relajación";
    } else {
        activity = "🛏️ Descanso";
    }

    return "Recomendación: " + activity;
}