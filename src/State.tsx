// http://bit.ly/10N1CR3ACT
// ettblog.eu/typescript-react/context/
import React, { createContext, useReducer, useEffect, useRef } from "react";
import { getInitial, setItem, getDefault } from "./util/storage";
import { PERSISTANT } from "./constants";

type StateAction = {
  type: string,
  payload: any
}

interface AppContext {
  dispatch?: any,
  state: {
    theme: string,
    vibrate: boolean,
    sound: boolean,
    frequency: number,
    wpm: number,
    toneType: string,
    difficulty: string
  }
}

let initialContext = { state: getDefault() };

let AppContext = React.createContext<AppContext>(initialContext);

let reducer = (state: any, action: StateAction) => {
  switch(action.type) {
    case "setWpm": {
      return { ...state, wpm: action.payload }
      break;
    }
    case "setFrequency": {
      const newState = { ...state, frequency: action.payload }
      return newState;
      break;
    }
    case "setTheme": {
      return { ...state, theme: action.payload }
      break;
    }
    case "setSound": {
      console.log('in reducer', action);
      return { ...state, sound: action.payload }
      break;
    }
    case "setVibrate": {
      return { ...state, vibrate: action.payload }
      break;
    }
    case "setToneType": {
      return { ...state, toneType: action.payload }
      break;
    }
    case "setDifficulty": {
      return { ...state, difficulty: action.payload }
      break;
    }
    case "setAll": {
      return action.payload;
    }
  }
  console.log('end reducer', state);
  return state;
};


function AppContextProvider(props: any) {
  const initialState = initialContext.state;

  let hasBeenSet = useRef(false);

  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };

  
  useEffect(() => {
    if (hasBeenSet.current){
      let readyState = {
        theme: state.theme,
        vibrate: state.vibrate,
        sound: state.sound,
        frequency: state.frequency,
        wpm: state.wpm,
        toneType: state.toneType,
        difficulty: state.difficulty
      }
      console.log('ready state', readyState);
      setItem(PERSISTANT, JSON.stringify(readyState));
    }
  }, [state]);

  useEffect(() => {
    
    console.log('AppContext useEffect set state first', state);
    getInitial().then((data) => {
      dispatch({ type: 'setAll', payload: data });
      hasBeenSet.current = true;
    })
    
  }, []);
  
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };