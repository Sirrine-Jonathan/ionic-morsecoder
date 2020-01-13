import { IonPage, IonContent, IonIcon, IonText, IonCard } from "@ionic/react";

import React, { useState, useContext } from "react";

import Header from "../components/Header";
import TimingTool from "../components/TimingTool";
import EventfulButton from "../components/EventfulButton";
import { keypad } from "ionicons/icons";
import { AppContext } from "../State";
import drills from '../util/drills';

const PracticePage: React.FC = () => {
  const [isPushed, setIsPushed] = useState(false);
  const [textWasCleared, setTextWasCleared] = useState(true);
  const [drillIndex, setDrillIndex] = useState(Math.random() * drills.length);
  const { state, dispatch } = useContext(AppContext);



  // returns dot duration in milliseconds
  function getBasicUnit(){
    return (1200 / state.wpm); 
  }

  function recordSymbol(symbol: string){
    console.log(symbol);
  }

  function startRecordingText(){
    setTextWasCleared(false);
  }

  return (
      <IonPage>
        <Header title="Practice" showSettings={true} />
        <div className="page-content">
        <IonCard>
          <IonText>Next Drill</IonText>
        </IonCard>
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
}

export default PracticePage;