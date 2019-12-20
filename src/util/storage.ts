import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

async function getItem (key: string){
    const { value } = await Storage.get({ key: 'name' });
    return value;
}

async function setItem (key: string, value: string){
    await Storage.set({
        key: key,
        value: value
    });
}

export { getItem, setItem };