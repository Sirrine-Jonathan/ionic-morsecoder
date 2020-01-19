
const easyDrills = [
    "A B C D C D E F G H I J K L M N O P Q R S T U V W X Y Z",
    "Q F L Y",
    "M I T E",
    "V J U W",
]

const intermediateDrills = [
    "Hi how are you",
    "What is your name",
    "Thank you",
    "Good morning"
];

const expertDrills = [
    "The quick brown fox jumps over a lazy dog",
    "Pack my box with five dozen liquor jugs",
    "How quickly daft jumping zebras vex",
    "TV quiz drag nymphs blew JFK cox"
];

function shuffle(array: string[]) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

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

export { 
    getDrill,
    getChallenges
};