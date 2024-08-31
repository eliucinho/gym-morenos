//js/userProgress.js
function analyzeUserProgress(exercisesData, dayIndex) {
    const dayExercises = exercisesData[dayIndex]?.ejercicios || [];
    const objectiveCount = {};
    const levelCount = {};

    dayExercises.forEach(exercise => {
        objectiveCount[exercise.objetivo] = (objectiveCount[exercise.objetivo] || 0) + 1;
        levelCount[exercise.nivel] = (levelCount[exercise.nivel] || 0) + 1;
    });

    const mainObjective = Object.keys(objectiveCount).reduce((a, b) => objectiveCount[a] > objectiveCount[b] ? a : b);
    const mainLevel = Object.keys(levelCount).reduce((a, b) => levelCount[a] > levelCount[b] ? a : b);

    return { mainObjective, mainLevel };
}