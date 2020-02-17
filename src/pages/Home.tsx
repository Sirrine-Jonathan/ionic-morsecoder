import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  IonPage,
  IonIcon,
  IonInput
} from '@ionic/react';
import { keypad } from 'ionicons/icons';
import EventfulButton from '../components/EventfulButton';
import TimingTool from '../components/TimingTool';
import Header from '../components/Header';
import { close, play, square } from 'ionicons/icons';
import Dictionary from '../util/dictionary';
import '../theme/style.scss';
import Row from '../components/Row';
import { AppContext } from '../State';
import { GlobalPlayer } from '../util/sound';

const HomePage: React.FC = () => {

  const [isPushed, setIsPushed] = useState(false);
  const [currentMorse, setCurrentMorse] = useState("");
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [textWasCleared, setTextWasCleared] = useState(true);
  const { state } = useContext(AppContext);
  const didMount = useRef(false);
  const tone = useRef<any>(GlobalPlayer);

  // returns dot duration in milliseconds
  function getBasicUnit(){
    return (1200 / state.wpm); 
  }

  function recordSymbol (symbol: string){
    checkScroll();
    setCurrentMorse(prevText => prevText += symbol);
  }

  function getTranslation(){
    return Dictionary.interpret(currentMorse);
  }

  function eraseText(){
    setCurrentMorse(""); 
    setTextWasCleared(true);
    setIsPlayingBack(false);
  }

  function startRecordingText(){
    setTextWasCleared(false);
  }

  function togglePlay(){
    setIsPlayingBack(!isPlayingBack);
  }

  function changeEnglish(e: any){
    let english = Dictionary.translate(e.target.value);
    setCurrentMorse(english);
    checkScroll();
  }

  function checkScroll(){
    let morseInput = document.querySelector('#morseInput input');
    let alphaInput = document.querySelector('#alphaInput input');
    if (morseInput && alphaInput){
      morseInput.scrollLeft = morseInput.scrollWidth;
      alphaInput.scrollLeft = alphaInput.scrollWidth;
    }
  }

  useEffect(() => {
    if (didMount.current){
      if (isPlayingBack){
        tone.current.setMorse(currentMorse);
        tone.current.play(function(){
          setIsPlayingBack(false);
        });
      } else {
        tone.current.stop();
      }
    } else {
      didMount.current = true;
    }
    return function(){
      tone.current.stop();
    }
  }, [isPlayingBack]);
  
  return (
    <IonPage>
      <Header title="mo.-.se code.-." showSettings={true}/>
      <div className="page-content">
        <Row justify="space-between" align="center">
          <IonInput 
            id="alphaInput"
            className="homeInput"
            value={ getTranslation() }
            onInput={changeEnglish}
            placeholder="English"
          ></IonInput>
          { 
            ((getTranslation() == "") ? 
            null:
            (<IonIcon icon={(isPlayingBack) ? square:play} className="homeIcon" size="large" onClick={togglePlay}></IonIcon>)) 
          }
        </Row>
        <Row justify="space-between" align="center" >
          <IonInput 
            id="morseInput"
            className="homeInput" 
            value={ currentMorse.replace(new RegExp('[^. -]', "ig"), "") }
            onInput={(e: any) => {
              let morseInputText = e.target.value;
              let regexRestriction = new RegExp('[^. -]', "ig");
              morseInputText = morseInputText.replace(regexRestriction, "");
              setCurrentMorse(morseInputText);
              checkScroll();
            }}
            placeholder="Morse"
          ></IonInput>
          { 
            ((currentMorse == "") ? 
            null:
            (<IonIcon icon={close} size="large" className="homeIcon" onClick={eraseText}></IonIcon>)) 
          }
        </Row>
        <TimingTool 
          baseUnit={getBasicUnit()} 
          buttonPressed={isPushed}
          onInputEnd={recordSymbol}
          textWasCleared={textWasCleared}
          startRecordingText={startRecordingText}
        />
        <EventfulButton
          onPress={() => {setIsPushed(true)}}
          onRelease={() => {setIsPushed(false);}}
        >
          <IonIcon icon={ keypad } style={{fontSize: "90px"}}/>
        </EventfulButton>
      </div>
    </IonPage>
  );
};

export default HomePage;
