const randomWords = require('random-words');

const easyDrills: string[] = [];
for(let i = 0; i <= 50; i++){
    easyDrills.push(randomWords({exactly: 1, maxLength: 5, }).join('').split('').join(' '));
}

const intermediateDrills: string[]= [];
for(let i = 0; i <= 50; i++){
    intermediateDrills.push(randomWords({exactly: 3, join: ' ', maxLength: 4 }));
}

const expertDrills: string[] = []
for(let i = 0; i <= 50; i++){
    expertDrills.push(randomWords({min: 4, max: 7, join: ' ', minLength: 4 }));
}

const easyExercises = [
    ..."0123456789".split(''),
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
];

const intermediateExercises = easyDrills.map((drill) => { return drill.split(" ").join('')});
const expertExercises: string[] = [];
let temp = expertDrills.map((drill) => { return drill.split(' ')});
temp.forEach((each) => {
    each.forEach((drill) => {
        expertExercises.push(drill);
    })
})

function getDrill(difficulty: string){
    let drills = easyDrills;
    if (difficulty === 'intermediate'){
        drills = intermediateDrills;
    } else if (difficulty === 'expert'){
        drills = expertDrills;
    }
    let randomIndex = Math.floor(Math.random() * drills.length);
    let sentence = drills[randomIndex].split(' ');
    return [...sentence];
}

function getTotalDrillsByDifficulty(difficulty: string){
    let total = easyDrills.length;
    if (difficulty === 'intermediate'){
        total = intermediateDrills.length;
    } else if (difficulty === 'expert'){
        total = expertDrills.length;
    }
    return total; 
}

function getChallenges(difficulty: string, amount: number){
    let challenges: string[][] = [];
    let total = getTotalDrillsByDifficulty(difficulty);
    let ind = 0;
    while (challenges.length < amount && challenges.length < total && ind < total){
        let nextDrill: string[];
        let indexOfNext;
        do {
            nextDrill = getDrill(difficulty);
            indexOfNext = challenges.findIndex(function(each){
                return JSON.stringify(each) === JSON.stringify(nextDrill);
            });
        } while (indexOfNext >= 0);
        challenges.push(nextDrill);
        ind++;
    }
    return challenges;
}

function getExercise(difficulty: string){
    let drills = easyExercises;
    if (difficulty === 'intermediate'){
        drills = intermediateExercises;
    } else if (difficulty === 'expert'){
        drills = expertExercises;
    }
    let randomIndex = Math.floor(Math.random() * drills.length);
    let sentence = drills[randomIndex];
    return sentence;
}

export { 
    getDrill,
    getChallenges,
    getExercise
};