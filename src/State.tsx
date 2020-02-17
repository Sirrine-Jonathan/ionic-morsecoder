// http://bit.ly/10N1CR3ACT
// ettblog.eu/typescript-react/context/
import React, { useReducer, useEffect, useRef } from "react";
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
    }
    case "setFrequency": {
      const newState = { ...state, frequency: action.payload }
      return newState;
    }
    case "setTheme": {
      return { ...state, theme: action.payload }
    }
    case "setSound": {
      return { ...state, sound: action.payload }
    }
    case "setVibrate": {
      return { ...state, vibrate: action.payload }
    }
    case "setToneType": {
      return { ...state, toneType: action.payload }
    }
    case "setDifficulty": {
      return { ...state, difficulty: action.payload }
    }
    case "setAll": {
      return action.payload;
    }
  }
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
      setItem(PERSISTANT, JSON.stringify(readyState));
    }
  }, [state]);

  useEffect(() => {
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