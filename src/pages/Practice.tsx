import { IonPage, IonContent, IonIcon, IonText, IonCard, IonList, IonButton } from "@ionic/react";

import React, { useState, useContext, useRef, useEffect } from "react";

import Header from "../components/Header";
import TimingTool from "../components/TimingTool";
import EventfulButton from "../components/EventfulButton";
import { keypad } from "ionicons/icons";
import { AppContext } from "../State";
import { getDrill, getChallenges } from '../util/drills';
import DrillCard from "../components/DrillCard";
import Dictionary from "../util/dictionary";
import '../theme/style.scss';
import { TonePlayer } from "../util/sound";
import { refresh } from 'ionicons/icons';

const PracticePage: React.FC = () => {

  const [isPushed, setIsPushed] = useState(false);
  const [currentMorse, setCurrentMorse] = useState("");
  const [textWasCleared, setTextWasCleared] = useState(true);
  const [drillIndex, setDrillIndex] = useState(0);
  const [text, setText] = useState('');
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const sessionChallenges = useRef(getChallenges(state.difficulty, 10));
  const [challengeIndex, setChallengeIndex] = useState(sessionChallenges.current.length - 1);

  const tone = useRef<any>(new TonePlayer(
    state.wpm,
    state.frequency,
    state.toneType
  ));

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

  function refreshFn(){
    sessionChallenges.current = getChallenges(state.difficulty, 10);
    setChallengeIndex(sessionChallenges.current.length - 1);
    setNeedsRefresh(false);
  }

  useEffect(function(){
    if (sessionChallenges.current && sessionChallenges.current.length > 0){
      let currentDrill = sessionChallenges.current[challengeIndex];
      let currentDrillString = currentDrill[drillIndex].toLowerCase();
      let currentString = Dictionary.interpret(currentMorse).toLowerCase();
      let index = currentString.search(currentDrillString);
      if (index >= 0){
        currentDrill.shift();
        if (currentDrill.length === 0){
          sessionChallenges.current.pop();
          setChallengeIndex(challengeIndex - 1);
        }
        setCurrentMorse('');
        tone.current.playSound('Got One');
      }
    } else {
      tone.current.playSound('Win');
      if (sessionChallenges.current.length == 0){
        setNeedsRefresh(true);
      }
    }
  }, [currentMorse, drillIndex]);

  function clear(){
    setCurrentMorse('');
  }

  return (
      <IonPage>
        <Header title="Practice" showSettings={true} />
        <div className="page-content">
          {(needsRefresh) ?
            (
              <div className="refresh" onClick={refreshFn}>
                <IonButton  slot="center" className="refreshBtn">
                  <IonIcon slot="icon-only" icon={refresh} />
                </IonButton>
              </div>
            )
            :
            (
              <ListChallenges challenges={sessionChallenges.current}/>
            )
          }
          <div className="drillsContainer">
          <IonText className="answerPreview">{Dictionary.interpret(currentMorse)}</IonText>
          <TimingTool 
            baseUnit={getBasicUnit()} 
            buttonPressed={isPushed}
            onInputEnd={recordSymbol}
            textWasCleared={textWasCleared}
            startRecordingText={startRecordingText}
            clear={clear}
          />
          <EventfulButton
            onPress={() => {setIsPushed(true)}}
            onRelease={() => {setIsPushed(false)}}
          >
            <IonIcon icon={ keypad } style={{fontSize: "90px"}}/>
          </EventfulButton>
          </div>
        </div>
      </IonPage>
  );
}

interface ListCardsProps {
  drills: string[]
}

const ListCards: React.FC<ListCardsProps> = ({ drills }) => {
  let items = drills.map((each, index) => {
    return (<DrillCard title={each} key={index}/>);
  });
  items = items;
  return (<div className="drillList" >{items}</div>);
};

interface ListChallengesProps {
  challenges: string[][]
}

const ListChallenges: React.FC<ListChallengesProps> = ({ challenges }) => {
  let items = challenges.map((each, index) => {
    return <ListCards key={index} drills={each} />
  })
  return (<div className="challengeList">{items}</div>)
}

export default PracticePage;