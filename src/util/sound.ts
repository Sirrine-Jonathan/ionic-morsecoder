class TonePlayer {

    WORD_SPACE = '&';
    LETTER_SPACE = '#';
    SYMBOL_SPACE = '@';

    wpm: number;
    baseUnit: number;
    isPlaying: boolean = false;
    symbols: string[];


    constructor(morse: string, wpm: number){
        this.wpm = wpm;
        this.baseUnit = this.getBaseUnit(this.wpm);
        this.symbols = this.buildArray(morse);
    }

    getBaseUnit = (wpm: number) => {
        return (1200 / wpm); // returns dot duration in milliseconds
    }

    playDot = () => {}
    playDash = () => {}
    playSymbolSpace = () => {}
    playLetterSpace = () => {}
    playWordSpace = () => {}

    buildArray = (morse: string) => {
        return morse
            .split(/\s\s\s/g)
            .map(each => { return each.trim(); })
            .map(each => { return each
                .split(/\s/g)
                .map(each => { return each.trim(); })
                .map(each => { return each
                    .split('')
                    .map(each => { return each.trim(); })
                    .join(this.SYMBOL_SPACE);
                })
                .join(this.LETTER_SPACE);
            })
            .join(this.WORD_SPACE)
            .split('');
    }

    playLetter = (letter: string) => {
        letter.split('').forEach((symbol => {
            if (symbol === '.'){
                this.playDot();
            } else {
                this.playDash();
            }
        }))
    }

    playWord = (word: string) => {
        word.split(' ').forEach(letter => this.playLetter);
    }

    play = (text: string) => {
        text.split('   ').forEach(word => this.playWord);
    }

    stop = () => {

    }

    pause = () => {

    }

    resume = () => {

    }

    print = () => {
        console.log('Symbols Array', this.symbols);
        console.log('Symobls String', this.symbols.join(''));
        console.log('Simplified String', this.getSimpleString());
    }

    getSimpleString = () => {
        return this.symbols.join('')
            .split(this.SYMBOL_SPACE).join('')
            .split(this.LETTER_SPACE).join(' ')
            .split(this.WORD_SPACE).join('   ');
    }
}

export { 
    TonePlayer
};