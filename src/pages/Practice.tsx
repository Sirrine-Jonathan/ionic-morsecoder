import { IonPage, IonIcon, IonText, IonButton } from "@ionic/react";

import React, { useState, useContext, useEffect } from "react";

import Header from "../components/Header";
import TimingTool from "../components/TimingTool";
import EventfulButton from "../components/EventfulButton";
import { keypad } from "ionicons/icons";
import { AppContext } from "../State";
import Dictionary from "../util/dictionary";
import '../theme/style.scss';
import { refresh } from 'ionicons/icons';
import Challenges from "../components/Challenges";
import { getChallenges } from "../util/drills";

const PracticePage: React.FC = () => {

  let numberOfChallenges: number = 1;

  const [isPushed, setIsPushed] = useState(false);
  const [currentMorse, setCurrentMorse] = useState("");
  const [textWasCleared, setTextWasCleared] = useState(true);
  const [drillIndex] = useState(0);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const { state } = useContext(AppContext);
  const [ sessionChallenges, setSessionChallenges ] = useState(() => {
    return getChallenges(state.difficulty, numberOfChallenges); 
  });
  const [challengeIndex, setChallengeIndex] = useState(sessionChallenges.length - 1);
  
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
    let newChallenges = getChallenges(state.difficulty, numberOfChallenges);
    setSessionChallenges(newChallenges);
    setChallengeIndex(newChallenges.length - 1);
    setNeedsRefresh(false);
  }
  
  useEffect(function(){
    if (sessionChallenges && sessionChallenges.length > 0){
      let currentDrill = sessionChallenges[challengeIndex];
      let currentDrillString = currentDrill[drillIndex].toLowerCase();
      let currentString = Dictionary.interpret(currentMorse).toLowerCase();
      let index = currentString.search(currentDrillString);
      if (index >= 0){
        currentDrill.shift();
        if (currentDrill.length === 0){
          sessionChallenges.pop();
          setChallengeIndex(challengeIndex - 1);
        }
        setCurrentMorse('');
      }
    } else {
      if (sessionChallenges.length === 0){
        refreshFn();
        //setNeedsRefresh(true);
      }
    }
  }, [currentMorse, drillIndex]);
  

  function clear(){
    setCurrentMorse('');
  }

  function skipChallenge(){
    refreshFn();
  }

  return (
      <IonPage>
        <Header title="Practice" showSettings={true} />
        <div className="page-content">
          {(needsRefresh) ?
            (
              <div className="refresh" onClick={refreshFn}>
                <IonButton  slot="center" className="refreshBtn">
                  Play Again  <IonIcon icon={refresh} />
                </IonButton>
              </div>
            )
            :
            (
              <>
                <Challenges challenges={sessionChallenges}/>
                <IonButton className="challengeSkipBtn" onClick={skipChallenge}>
                  <IonIcon icon={refresh} />
                </IonButton>
              </>
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

export default PracticePage;