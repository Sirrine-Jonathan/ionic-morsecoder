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
    wpm: number
  }
}

let initialContext = { state: getDefault() };

/*
getInitial().then((data) => {
  initialContext.state = data;
})
*/

let AppContext = React.createContext<AppContext>(initialContext);

let reducer = (state: any, action: StateAction) => {
  switch(action.type) {
    case "setWpm": {
      return { ...state, wpm: action.payload }
      break;
    }
    case "setFrequency": {
      const newState = { ...state, frequency: action.payload }
      setItem(PERSISTANT, JSON.stringify(newState));
      return newState;
      break;
    }
    case "setTheme": {
      return { ...state, theme: action.payload }
      break;
    }
    case "setSound": {
      return { ...state, sound: action.payload }
      break;
    }
    case "setVibrate": {
      return { ...state, vibrate: action.payload }
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
      console.log('AppContext useEffect', state);
      setItem(PERSISTANT, JSON.stringify({
        theme: state.theme,
        vibrate: state.vibrate,
        sound: state.sound,
        frequency: state.frequency,
        wpm: state.wpm
      }));
    }
  }, [state]);

  useEffect(() => {
    
    console.log('AppContext useEffect set state first', state);
    getInitial().then((data) => {
      dispatch({ type: 'setAll', payload: data });
      console.log('AppContext useEffect set state second', state);
      hasBeenSet.current = true;
    })
    
  }, []);
  

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };