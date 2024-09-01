// js/userProgress.js
function analyzeUserProgress(dayIndex, exercisesData) {
    const dayExercises = exercisesData[dayIndex]?.ejercicios || [];
    const objectiveCount = {};
    const levelCount = {};

    dayExercises.forEach(exercise => {
        objectiveCount[exercise.objetivo] = (objectiveCount[exercise.objetivo] || 0) + 1;
        levelCount[exercise.nivel] = (levelCount[exercise.nivel] || 0) + 1;
    });

    // Asegurar que haya al menos un valor en los contadores antes de usar reduce
    const mainObjective = Object.keys(objectiveCount).length > 0 
        ? Object.keys(objectiveCount).reduce((a, b) => objectiveCount[a] > objectiveCount[b] ? a : b)
        : "Sin objetivo principal";

    const mainLevel = Object.keys(levelCount).length > 0 
        ? Object.keys(levelCount).reduce((a, b) => levelCount[a] > levelCount[b] ? a : b)
        : "Sin nivel principal";

    return { mainObjective, mainLevel };
}