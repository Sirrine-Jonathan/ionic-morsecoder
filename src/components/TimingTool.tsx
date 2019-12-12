import {
  IonProgressBar
} from '@ionic/react';
import React, { useState, useEffect } from 'react';

interface TimingToolProps {
  percent: number,
  buttonPressed: boolean
}

const SharedStyle = {
  height: '25px'
}

const TimingTool: React.FunctionComponent<TimingToolProps> = ({ percent, buttonPressed }) => {

  const [laststamp, setLaststamp] = useState()
  const [time, setTime] = useState(0);

  let soundPercent = (buttonPressed) ? percent:0;
  let silentPercent = (buttonPressed) ? 0:percent;

  function keepTime(timestamp: number){
    if (laststamp == undefined){
      setLaststamp(timestamp);
    }
    let time = timestamp - laststamp;
    setTime(time);
    //console.log(`timestamp: ${timestamp}`);
    //console.log(`laststamp: ${laststamp}`);
    //console.log(`time: ${time}`);
    //window.requestAnimationFrame(keepTime);
  }

  useEffect(() => {
    keepTime(0);
  })

  return (
    <>
      <IonProgressBar style={SharedStyle} value={soundPercent}></IonProgressBar>
      <IonProgressBar style={SharedStyle} value={silentPercent}></IonProgressBar>
    </>
  );
}

export default TimingTool;
