import {
  IonProgressBar
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';

interface TimingToolProps {
  percent: number,
  buttonPressed: boolean
}

const SharedStyle = {
  height: '25px'
}

const TimingTool: React.FunctionComponent<TimingToolProps> = ({ percent, buttonPressed }) => {

  const [time, setTime] = useState(0);
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);

  let soundPercent = (buttonPressed) ? percent:0;
  let silentPercent = (buttonPressed) ? 0:percent;

  function keepTime(timestamp: number){
    if (previousTimeRef.current != undefined){
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(prevCount => (prevCount + deltaTime * 0.01));
    }
    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(keepTime);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(keepTime);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <>
      <div>{ Math.floor(time) }</div>
      <IonProgressBar style={SharedStyle} value={soundPercent}></IonProgressBar>
      <IonProgressBar style={SharedStyle} value={silentPercent}></IonProgressBar>
    </>
  );
}

export default TimingTool;
