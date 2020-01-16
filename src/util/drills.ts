
const drills = [
    "The quick brown fox jumps over a lazy dog",
    "Pack my box with five dozen liquor jugs",
    "How quickly daft jumping zebras vex",
    "TV quiz drag nymphs blew JFK cox"
]

function shuffle(array: string[]) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

function getDrills(){
    let randomIndex = Math.floor(Math.random() * drills.length);
    let sentence = drills[randomIndex].split(' ');
    return [...sentence];
}

export { 
    drills,
    getDrills
};