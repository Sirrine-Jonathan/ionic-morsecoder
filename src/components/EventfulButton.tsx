import React, { useState, useContext, useRef } from 'react';
import { getItem } from '../util/storage';
import './EventfulButton.scss';
import { AppContext } from '../State';
import {
  Plugins,
} from '@capacitor/core';
import { TonePlayer, GlobalPlayer } from '../util/sound';
const { Haptics } = Plugins;

type EventCallback = () => any;

interface EventfulButtonProps {
  onPress: EventCallback,
  onRelease: EventCallback
}

const EventfulButton: React.FC<EventfulButtonProps> = ({ onPress, onRelease, children }) => {

  const [isPressed, setIsPressed] = useState(false);
  const { state, dispatch } = useContext(AppContext);
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
