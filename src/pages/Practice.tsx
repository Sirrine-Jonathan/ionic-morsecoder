import { IonPage, IonContent, IonIcon, IonText, IonCard, IonList } from "@ionic/react";

import React, { useState, useContext, useRef } from "react";

import Header from "../components/Header";
import TimingTool from "../components/TimingTool";
import EventfulButton from "../components/EventfulButton";
import { keypad } from "ionicons/icons";
import { AppContext } from "../State";
import drills from '../util/drills';
import DrillCard from "../components/DrillCard";
import dictionary from "../util/dictionary";

function shuffle(array: any[]) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
shuffle(drills);

const PracticePage: React.FC = () => {

  const [isPushed, setIsPushed] = useState(false);
  const [currentMorse, setCurrentMorse] = useState("");
  const [textWasCleared, setTextWasCleared] = useState(true);
  const [drillIndex, setDrillIndex] = useState(Math.random() * drills.length);
  const [text, setText] = useState('');
  const sessionDrills = useRef(drills);
  const { state, dispatch } = useContext(AppContext);

  // returns dot duration in milliseconds
  function getBasicUnit(){
    return (1200 / state.wpm); 
  }

  function recordSymbol(symbol: string){
    setCurrentMorse(prevText => prevText += symbol);
  }

  function startRecordingText(){
    setTextWasCleared(false);
  }

  const answerPreviewStyle = {
    textAlign: 'center' as 'center',
    fontSize: '30px'
  }

  return (
      <IonPage>
        <Header title="Practice" showSettings={true} />
        <div className="page-content">
          <ListCards drills={sessionDrills.current} />
          <IonText style={answerPreviewStyle}>{dictionary.interpret(currentMorse)}</IonText>
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

interface ListCardsProps {
  drills: string[]
}

const ListCards: React.FC<ListCardsProps> = ({ drills}) => {
  let items = drills.map((each, index) => {
    return (<DrillCard title={each} key={index}/>);
  });
  items = items;
  return <IonList>{items}</IonList>;
};

export default PracticePage;