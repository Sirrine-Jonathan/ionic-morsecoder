interface LookupTable {
    [key: string]: string;
}

const Table: LookupTable = {
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
    " ": "   "
}

function getValueFromKey(object: LookupTable, morse: string){
    return Object.keys(object).find(key => object[key] === morse) || "";
}

function getKeyArray(){
    return Object.keys(Table);
}

function translate(english: string){
    let strArr = english.split('');
    let morseArr: string[] = [];
    strArr.forEach((each) => {
        morseArr.push(Table[each.toLowerCase()]);
    })
    return morseArr.join(' ');
}

function interpret(morse: string){
    console.log('morse', morse);
    let englishArr: string[] = [];
    const regex = /\s\s\s/g;
    let wordArr = morse.split(regex);
    wordArr.forEach((word) => {
        let letterArr = word.split(' ');
        let englishLetterArr: string[] = [];
        letterArr.forEach((letter) => {
            let englishLetter: string = getValueFromKey(Table, letter);
            englishLetterArr.push(englishLetter);
        })
        let englishWord = englishLetterArr.join('');
        englishArr.push(englishWord);
    })
    let englishStr = englishArr.join(' ');
    return englishStr;
}

export default {
    Table,
    interpret,
    translate,
    getKeyArray
}
