import React, { useState, useRef } from 'react';
import './EventfulButton.scss';
import { GlobalPlayer } from '../util/sound';

type EventCallback = () => any;

interface EventfulButtonProps {
  onPress: EventCallback,
  onRelease: EventCallback
}

const EventfulButton: React.FC<EventfulButtonProps> = ({ onPress, onRelease, children }) => {

  const [isPressed, setIsPressed] = useState(false);
  const tone = useRef<any>(GlobalPlayer);

  function startOsc( ){
    tone.current.startTone();
  };

  function off() {
    tone.current.stopTone();
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
          startOsc();
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
