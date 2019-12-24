import React, { useState, useContext } from 'react';
import { getItem } from '../util/storage';
import './EventfulButton.scss';
import { AppContext } from '../State';

type EventCallback = () => any;

interface EventfulButtonProps {
  onPress: EventCallback,
  onRelease: EventCallback
}

const EventfulButton: React.FC<EventfulButtonProps> = ({ onPress, onRelease, children }) => {

  const [isPressed, setIsPressed] = useState(false);
  const [context, setContext] = useState();
  const [oscillator, setOscillator] = useState();
  const [gainNode, setGainNode] = useState();

  const { state, dispatch } = useContext(AppContext);

  function startOsc(frequency: number){ 
    let ctx = new AudioContext();
    let osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(state.frequency, ctx.currentTime);
    let Gain = ctx.createGain();
    Gain.gain.setValueAtTime(0.5, ctx.currentTime);
    osc.connect(Gain);
   
    Gain.connect(ctx.destination);
    osc.start();
    setContext(ctx);
    setOscillator(osc);
    setGainNode(Gain);
  };

  function off() {
     gainNode.gain.setTargetAtTime(0, context.currentTime, 0.015);
  }

  let classname = "";
  if (isPressed){
    classname = "eventful-pressed";
  } else {
    classname = "eventful-unpressed";
  }

  return (
    <div className="button-container">
      <button
        className={classname}
        onTouchStart={() => {
          onPress(); 
          setIsPressed(true);
          startOsc(440);
        }}
        onTouchEnd={() => {
          onRelease(); 
          setIsPressed(false);
          off();
        }}
      >{ children }</button>
    </div>
  )
}

export default EventfulButton;
