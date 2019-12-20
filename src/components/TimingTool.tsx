import {
  IonProgressBar
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';

type EventCallback = (param?: any) => any;

interface TimingToolProps {
  baseUnit: number,
  buttonPressed: boolean,
  onInputEnd: EventCallback
}

const SharedStyle = {
  height: '25px'
}

const LevelOne = {
  backgroundColor: "#6CB4FF"
}

const LevelTwo = {
  backgroundColor: "#3981FF"
}

const LevelThree = {
  backgroundColor: "#064ECD"
}

const TimingTool: React.FunctionComponent<TimingToolProps> = ({ baseUnit, buttonPressed, onInputEnd }) => {

  const [time, setTime] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);
  const previousButtonState = useRef(buttonPressed);

  let soundPercent = (buttonPressed) ? getPercent(6):0;
  let silentPercent = (buttonPressed) ? 0:getPercent(14);

  function getPercent(multiplier: number = 1){
    return time / ((baseUnit * multiplier));
  }

  function keepTime(timestamp: number){
    if (previousTimeRef !== undefined){
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(prevCount => (prevCount + deltaTime));
    }
    previousTimeRef.current = timestamp;
    if (shouldReset){
      setShouldReset(false);
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(deltaTime);
      let symbol = emitSymbol();
      onInputEnd(symbol);
    }
    requestRef.current = requestAnimationFrame(keepTime);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(keepTime);
    return () => cancelAnimationFrame(requestRef.current);
  }, [keepTime]);

  useEffect(() => {
    if (buttonPressed !== previousButtonState.current){
      previousButtonState.current = buttonPressed;
      previousTimeRef.current = 0;
      setShouldReset(true);
    }
  }, [buttonPressed]);

  function getSoundStyle(){
    if (getPercent(2) < 1){
      return {
        height: SharedStyle.height,
        "--progress-background": LevelOne.backgroundColor
      }
    } else {
      return {
        height: SharedStyle.height,
        "--progress-background": LevelThree.backgroundColor
      }
    }
  }

  function getSilentStyle(){
    if (getPercent(2) < 1){
      return {
        height: SharedStyle.height,
        "--progress-background": LevelOne.backgroundColor
      }
    } else if (getPercent(6) < 1) {
      return {
        height: SharedStyle.height,
        "--progress-background": LevelTwo.backgroundColor
      }
    } else {
      return {
        height: SharedStyle.height,
        "--progress-background": LevelThree.backgroundColor
      }
    }
  }

  function emitSymbol(){
    if (!buttonPressed){
      if (getPercent(2) < 1){
        return '.';
      } else {
        return '-';
      } 
    } else {
      if (getPercent(2) < 1){
        console.log('no space');
        return '';
      } else if (getPercent(6) < 1) {
        console.log('letter space');
        return ' ';
      } else {
        console.log('word space');
        return '   ';
      }
    }
  }

  return (
    <>
      <IonProgressBar style={getSoundStyle()} value={soundPercent}></IonProgressBar>
      <IonProgressBar style={getSilentStyle()} value={silentPercent}></IonProgressBar>
    </>
  );
}

export default TimingTool;
