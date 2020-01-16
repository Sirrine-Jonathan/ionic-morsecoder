import {
  IonProgressBar
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import TimingBar from './TimingBar';

type EventCallback = (param?: any) => any;

interface TimingToolProps {
  baseUnit: number,
  buttonPressed: boolean,
  onInputEnd: EventCallback,
  textWasCleared: boolean,
  startRecordingText: EventCallback,
  clear?: EventCallback
}

const TimingTool: React.FunctionComponent<TimingToolProps> = ({ 
  baseUnit, 
  buttonPressed, 
  onInputEnd, 
  textWasCleared, 
  startRecordingText,
  clear
}) => {

  const [time, setTime] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);
  const previousButtonState = useRef(buttonPressed);
  const started = useRef(false);

  // the 6 and 14 comes from the total units that
  // make sense for each segment. A tone should only last
  // 3 units so we allow double that for the timing tool. 
  // this way a use should know to release the key in the 
  // second half of the timing bar so as to create a dash
  // since the longest time the button should remain unpressed
  // is 7, to emit a word space, we allow double that for 
  // the silent bar
  let soundPercent = (buttonPressed) ? getPercent(4):0;
  let silentPercent = (buttonPressed) ? 0:getPercent(8);

  // this function returns the percentage 
  // of the current time since the button was last pressed or
  // released of a total unit.
  function getPercent(multiplier: number = 1){
    return time / ((baseUnit * multiplier));
  }

  function keepTime(timestamp: number){
    if (previousTimeRef.current !== undefined){
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(prevCount => (prevCount + deltaTime));
      let passedUnits = Math.floor(time / baseUnit);
      if (clear && !buttonPressed && (passedUnits > 14)){
        clear();
      }
    }
    previousTimeRef.current = timestamp;
    if (shouldReset){
      setShouldReset(false);
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(deltaTime);
      let symbol = emitSymbol();
      if (!textWasCleared){
        onInputEnd(symbol);
      } else {
        startRecordingText();
      }
    }
    requestRef.current = requestAnimationFrame(keepTime);
  }

  useEffect(() => {
    if (started.current || buttonPressed){
      started.current = true;
      requestRef.current = requestAnimationFrame(keepTime);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [keepTime]);

  useEffect(() => {
    if (buttonPressed !== previousButtonState.current){
      previousButtonState.current = buttonPressed;
      previousTimeRef.current = 0;
      setShouldReset(true);
    }
  }, [buttonPressed]);

  function getSoundLevel(){
    if (getPercent(2) < 1){
      return 1
    } else {
      return 3
    }
  }

  function getSilentLevel(){
    if (getPercent(2) < 1){
      return 1
    } else if (getPercent(6) < 1) {
      return 2
    } else {
      return 3
    }
  }

  function emitSymbol(){
    let level;
    if (!buttonPressed){
      level = getSoundLevel();
      if (level === 1){
        return '.';
      } else if (level === 3) {
        return '-';
      }
    } else {
      level = getSilentLevel();
      if (level === 1){
        return '';
      } else if (level === 2) {
        return ' ';
      } else if (level === 3){
        return '   ';
      }
    }
  }

  return (
    <>
      {/* 
      
      // probably need to include height style on this for it to work again

      <IonProgressBar value={soundPercent}></IonProgressBar>
      <IonProgressBar value={silentPercent}></IonProgressBar>

      */}
      <TimingBar value={soundPercent} level={getSoundLevel()}/>
      <TimingBar value={silentPercent} level={getSilentLevel()}/>
    </>
  );
}

export default TimingTool;
