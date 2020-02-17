import { IonPage, IonInput, IonButton, IonIcon, IonText } from "@ionic/react"
import React, { useState, useRef, useEffect, useContext } from "react"
import Header from "../components/Header"
import { square, play, refresh } from "ionicons/icons"
import { GlobalPlayer } from "../util/sound"
import { getExercise } from "../util/drills"
import Dictionary from '../util/dictionary';
import '../theme/style.scss';
import { AppContext } from "../State"

const TrainPage: React.FC = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const { state } = useContext(AppContext);
    const [exercise, setExercise] = useState(getExercise(state.difficulty));
    const [input, setInput] = useState("");
    const tone = useRef<any>(GlobalPlayer);

    function playExercise(){
      setIsPlaying(!isPlaying);
    }

    function updateInput(e: any){
      setInput(e.target.value);
    }

    function getExerciseDisplay(){
      let answer = input.trim();
      let displayArr: string[] = [];
      let isWinner = true;
      exercise.split('').forEach((each, ind) => {
        if ((answer[ind] && answer[ind].toUpperCase()) !== each.toUpperCase()){
          if (each === " ")
            displayArr.push(' ');
          else 
            displayArr.push('_');
          isWinner = false;
        } else {
          displayArr.push(each);
        }
      })

      if (isWinner){
        winner();
      }

      return displayArr;
    }

    function winner(){
      setExercise(getExercise(state.difficulty))
      setInput("");
    }

    function skipExercise(){
      setExercise(getExercise(state.difficulty))
    }

    useEffect(() => {
        if (isPlaying){
          tone.current.setMorse(Dictionary.translate(exercise));
          tone.current.play(function(){
            setIsPlaying(false);
          });
        } else {
          tone.current.stop();
        }
    }, [isPlaying]);

    return (
      <IonPage>
        <Header title="Train" showSettings={true} />
        <div className="page-content">
          <IonText className="exercise">{ getExerciseDisplay() }</IonText>
          <div className="skipExerciseContainer">
            <IonButton className="exerciseSkipBtn" onClick={skipExercise}>
              <IonIcon icon={refresh} />
            </IonButton>
          </div>
          <IonButton
            className="exerciseButton"
            onClick={playExercise}
          >
              <IonIcon icon={(isPlaying) ? square:play}></IonIcon>
          </IonButton>
          <IonInput 
            className="trainInput" 
            placeholder="Interpret"
            value={input}
            onInput={updateInput}
          ></IonInput>
        </div>
      </IonPage>
    )
}
export default TrainPage;