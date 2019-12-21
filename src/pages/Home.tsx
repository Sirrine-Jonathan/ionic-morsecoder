import React, { useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonText,
  IonInput
} from '@ionic/react';
import { keypad } from 'ionicons/icons';
import EventfulButton from '../components/EventfulButton';
import TimingTool from '../components/TimingTool';
import TextInput from '../components/TextInput';
import Header from '../components/Header';
import { close, play, square } from 'ionicons/icons';
import Dictionary from '../util/dictionary';
import './Home.css';
import Row from '../components/Row';

const HomePage: React.FC = () => {

  const [isPushed, setIsPushed] = useState(false);
  const [wpm, setWpm] = useState(10);
  const [currentMorse, setCurrentMorse] = useState("");
  const [isPlayingBack, setIsPlayingBack] = useState(false);

  function getBasicUnit(){
    return (1200 / wpm); // returns dot duration in milliseconds
  }

  function recordSymbol (symbol: string){
    setCurrentMorse(prevText => prevText += symbol);
  }

  function getTranslation(){
    return Dictionary.interpret(currentMorse);
  }

  function translate(english: string){
    return Dictionary.translate(english);
  }

  function eraseText(){
    setCurrentMorse(""); 
  }

  function togglePlay(){
    setIsPlayingBack(!isPlayingBack);
  }

  function changeEnglish(e: any){
    setCurrentMorse(translate(e.target.value));
  }

  function changeMorse(e: any){
    setCurrentMorse(e.target.value);
  }

  return (
    <IonPage>
      <Header />
      <div className="page-content">
        <Row justify="space-between" align="center">
          <IonInput 
            style={{ fontSize: '30px'}} 
            value={ getTranslation() }
            onInput={changeEnglish}
            placeholder="English"
          ></IonInput>
          { 
            ((getTranslation() == "") ? 
            null:
            (<IonIcon icon={(isPlayingBack) ? square:play} size="large" onClick={togglePlay}></IonIcon>)) 
          }
        </Row>
        <Row justify="space-between" align="center">
          <IonInput 
            style={{ fontSize: '30px'}} 
            value={ currentMorse }
            onInput={changeMorse}
            placeholder="Morse"
          ></IonInput>
          { 
            ((currentMorse == "") ? 
            null:
            (<IonIcon icon={close} style={{ fontSize: '35px'}}  onClick={eraseText}></IonIcon>)) 
          }
        </Row>
        <TimingTool 
          baseUnit={getBasicUnit()} 
          buttonPressed={isPushed}
          onInputEnd={recordSymbol} 
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
