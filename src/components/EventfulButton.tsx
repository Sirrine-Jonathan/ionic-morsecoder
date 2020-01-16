import React, { useState, useContext, useRef } from 'react';
import { getItem } from '../util/storage';
import './EventfulButton.scss';
import { AppContext } from '../State';
import {
  Plugins,
} from '@capacitor/core';
import { TonePlayer } from '../util/sound';
const { Haptics } = Plugins;

type EventCallback = () => any;

interface EventfulButtonProps {
  onPress: EventCallback,
  onRelease: EventCallback
}

const EventfulButton: React.FC<EventfulButtonProps> = ({ onPress, onRelease, children }) => {

  const [isPressed, setIsPressed] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const tone = useRef<any>(new TonePlayer(
    state.wpm,
    state.frequency,
    state.toneType
  ));

  function startOsc(frequency: number){
    tone.current.startTone();
    //Haptics.selectionStart();
  };

  function off() {
    tone.current.stopTone();
    //Haptics.selectionEnd();
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
