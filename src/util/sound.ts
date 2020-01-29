import Tone, { Time, Signal } from "tone";
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;

class TonePlayer {

	WORD_SPACE = '&';
	LETTER_SPACE = '#';
	SYMBOL_SPACE = '@';

	wpm: number = 15;
	frequency: number = 440;
	baseUnit: number = this.getBaseUnit(this.wpm);
	isPlaying: boolean = false;
	symbols: string[] = [];
	synth: Tone.Synth = new Tone.Synth();
	totalUnitsUsed: number = 0;
	sounds: Tone.Players;
	soundsLoaded: boolean = false;

	constructor(wpm: number, frequency: number, toneType: string){
		this.sync(wpm, frequency, toneType);

		// load game sounds
		const gotOnePath = 'sounds/powerUp9.ogg';
		const winPath = 'sounds/zapThreeToneUp.ogg';
		let ref = this;
		this.sounds = new Tone.Players({
			'Got One': gotOnePath,
			'Win': winPath
		}, function(){
			ref.soundsLoaded = true;
		}).toMaster();
	}

	sync = (wpm: number, frequency: number, toneType: string) => {
		this.wpm = wpm;
		this.frequency = frequency;
		this.baseUnit = this.getBaseUnit(this.wpm);
		this.synth = new Tone.Synth({
			oscillator: {
				type: toneType as any
			},
			envelope: {
				attack : 0.01 ,
				decay : 0.01 ,
				sustain : 1 ,
				release : 0.01
			}
		}).toMaster();
		Tone.Transport.start(0);
	}

	setMorse = (morse: string) => {
		Tone.Transport.cancel(Tone.context.now());
		this.symbols = this.buildArray(morse);
		this.totalUnitsUsed = this.calculateTotalUnitsUsed();
	}

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

	play = (callback: VoidFunction) => {
		let ref = this;
		let time = Tone.context.now();
		let elapsedUnits = 1;

		function playDot(){
			ref.synth.triggerAttackRelease(ref.frequency, ref.baseUnit);
		}
		function playDash(){
			ref.synth.triggerAttackRelease(ref.frequency, ref.baseUnit * 3);
		}
		function endOfPlayback(){
			callback();
		}
		function schedule(event: VoidFunction){
			Tone.Transport.scheduleOnce(event, '+' + (ref.baseUnit * elapsedUnits));
		}

		ref.symbols.forEach((symbol) => {
			switch(symbol){
				case '.':
					schedule(playDot);
					elapsedUnits++;
				break;
				case '-':
					schedule(playDash);
					elapsedUnits += 3;
				break;
				case ref.SYMBOL_SPACE:
					elapsedUnits++;
				break;
				case ref.LETTER_SPACE:
					elapsedUnits += 3;
				break;
				case ref.WORD_SPACE:
					elapsedUnits += 7;
				break;
			}
		});
		Tone.Transport.scheduleOnce(endOfPlayback, '+' + (ref.baseUnit * ref.totalUnitsUsed));
		
		Tone.Transport.start(time);
	}



	pause = () => {
		Tone.Transport.pause();
	}

	stop = () => {
		Tone.Transport.stop();
	}

	getSimpleString = () => {
		return this.symbols.join('')
			.split(this.SYMBOL_SPACE).join('')
			.split(this.LETTER_SPACE).join(' ')
			.split(this.WORD_SPACE).join('   ');
	}
	
	// returns dot duration in seconds
	getBaseUnit(wpm: number){
		return (1200 / wpm) / 1000; 
	}

	calculateTotalUnitsUsed(){
		let totalUnits = 0;
		this.symbols.forEach((symbol) => {
			if (symbol === '.' || symbol === this.SYMBOL_SPACE){
				totalUnits++;
			} else if (symbol === '-' || symbol === this.LETTER_SPACE){
				totalUnits += 3;
			} else if (symbol === this.WORD_SPACE){
				totalUnits += 7;
			}
		});
		return totalUnits;
	}

	startTone(){
		this.synth.triggerAttack(this.frequency);
	}

	stopTone(){
		this.synth.triggerRelease();
	}

	setWpm(wpm: number){
		this.wpm = wpm;
		this.baseUnit = this.getBaseUnit(wpm);
	}

	setTone(tone: string){
		this.synth.oscillator.type = tone as Tone.OscillatorType;
	}

	setFrequency(frequency: number){
		this.frequency = frequency;
		this.synth.setNote(frequency);
	}

	playSound(name: string){
		let SoundPlayer = this.sounds.get(name);
		if (SoundPlayer && SoundPlayer.loaded){
			SoundPlayer.start();
		} else {
		}
	}

	async playSoundAsync(name: string){
		let SoundPlayer = this.sounds.get(name);
		if (SoundPlayer && SoundPlayer.loaded){
			SoundPlayer.start();
		} else {

		}
	}
}

let GlobalPlayer = new TonePlayer(
	15,
	440,
	'sine'
);

export { 
	TonePlayer,
	GlobalPlayer
};