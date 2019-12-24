import { Plugins } from '@capacitor/core';
import { FREQUENCY, VIBRATE, SOUND, THEME, PERSISTANT } from '../constants';

const { Storage } = Plugins;

async function getItem (key: string){
    const { value } = await Storage.get({ key: key });
    return value;
}

async function setItem (key: string, value: string){
    console.log(`setting ${key} to ${value}`);
    return await Storage.set({
        key: key,
        value: value
    });
}

async function getInitial(){
    let initial = getDefault();
    let actualInitial = await getItem(PERSISTANT);
    if (actualInitial){
        initial = JSON.parse(actualInitial);
    }
    return initial;
}

function getDefault(){
    return {
        theme: 'light',
        vibrate: true,
        sound: true,
        frequency: 440,
        wpm: 20
    }
}

export { 
    getItem, 
    setItem, 
    getInitial,
    getDefault 
};