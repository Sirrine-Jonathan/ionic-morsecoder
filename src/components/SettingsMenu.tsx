import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonRange,
    IonButton,
    IonInput,
    useIonViewDidLeave,
    useIonViewDidEnter,
    useIonViewWillEnter,
    useIonViewWillLeave,
    IonRadioGroup,
    IonListHeader,
    IonRadio,
  } from '@ionic/react';
  import React, { useState, useContext, useRef, useEffect } from 'react';
  import { RouteComponentProps, withRouter } from 'react-router-dom';
  import { AppPage } from '../declarations';
  import './Menu.scss';
import { square, play, pulse, speedometer } from 'ionicons/icons';
import { AppContext } from '../State';
import { TonePlayer, GlobalPlayer } from '../util/sound';
import '../theme/style.scss';
  

  
  const SettingsMenu: React.FunctionComponent = () => {
      
    const [context, setContext] = useState();
    const [oscillator, setOscillator] = useState();
    const [gainNode, setGainNode] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const { state, dispatch } = useContext(AppContext);
    const tone = useRef<any>(GlobalPlayer);

    const PIN_STYLE = "white-space:nowrap;padding: 13px 34px 12px;display: flex;flex-direction: column;justify-content: center;align-items: center;font-size: 15px;transform: translate(-16px,-25px);border-radius: 5px;";

    const min = useRef(200);
    const max = useRef(1000);

    const minWpm = useRef(5);
    const maxWpm = useRef(25);

    function changeFrequency(e: any){
      let frequency = e.target.value;
      let rangePin = e.target.shadowRoot.querySelector('.range-pin');
      rangePin.style = PIN_STYLE;
      rangePin.innerHTML = "<div>" + frequency + " Hz</div>";

      dispatch({ type: "setFrequency", payload: e.target.value });
      tone.current.setFrequency(e.target.value);
      if (oscillator){
        oscillator.frequency.setValueAtTime(e.target.value, context.currentTime);
      }
    }

    function changeDifficulty(e: any){
      dispatch({
        type: 'setDifficulty',
        payload: e.target.value
      })
    }
    
    function changeSound(e: any){
      dispatch({
        type: 'setSound',
        payload: e.detail.checked
      })
    }

    function changeVibrate(e: any){
      dispatch({
        type: 'setVibrate',
        payload: e.detail.checked
      })
    }

    function changeTone(e: any){
      dispatch({
        type: 'setToneType',
        payload: e.target.value
      });
      tone.current.setTone(e.target.value);
    }

    function wpmChange(e: any){
      let wpm = e.target.value;
      let rangePin = e.target.shadowRoot.querySelector('.range-pin');
      rangePin.style = PIN_STYLE;
      rangePin.innerHTML = "<div style=''>" + wpm + " wpm</div>";
      dispatch({
        type: 'setWpm',
        payload: wpm
      })
      tone.current.setWpm(wpm);
    }

    function setRangePinStyle(e: any){
      console.log('range', e.target);
      let rangePin = e.target.shadowRoot.querySelector('.range-pin');
      rangePin.style = PIN_STYLE;
    }

    useEffect(() => {
          if (isPlaying){
              tone.current.startTone();
          } else {
              tone.current.stopTone();
          }
    }, [isPlaying]);
    
    return (
    <IonMenu menuId="settings" contentId="settingsMenu" type="overlay" side="end">
      <IonHeader className="MenuHeader ">
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="MenuBody">

        <IonRadioGroup onIonChange={changeDifficulty}>
          <IonListHeader>
            <IonLabel>Difficulty</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Beginner</IonLabel>
            <IonRadio slot="end" value="beginner" checked={(state.difficulty === 'beginner')}/>
          </IonItem>
          <IonItem>
            <IonLabel>Intermediate</IonLabel>
            <IonRadio slot="end" value="intermediate" checked={(state.difficulty === 'intermediate')}/>
          </IonItem>
          <IonItem>
            <IonLabel>Expert</IonLabel>
            <IonRadio slot="end" value="expert" checked={(state.difficulty === 'expert')}/>
          </IonItem>
        </IonRadioGroup>

        <IonRadioGroup onIonChange={changeTone}>
          <IonListHeader slot="center">
            <IonLabel>Tone Type</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Sine</IonLabel>
            <IonRadio slot="end" value="sine" checked={(state.toneType === 'sine')}/>
          </IonItem>
          <IonItem>
            <IonLabel>Square</IonLabel>
            <IonRadio slot="end" value="square" checked={(state.toneType === 'square')}/>
          </IonItem>
          <IonItem>
            <IonLabel>Sawtooth</IonLabel>
            <IonRadio slot="end" value="sawtooth" checked={(state.toneType === 'sawtooth')}/>
          </IonItem>
          <IonItem>
            <IonLabel>Triangle</IonLabel>
            <IonRadio slot="end" value="triangle"checked={(state.toneType === 'triangle')}/>
          </IonItem>
        </IonRadioGroup>

        <IonItem>
          <IonRange 
              min={min.current} 
              max={max.current} 
              defaultValue={state.frequency}
              value={state.frequency}
              onIonChange={changeFrequency}
              onTouchStart={() => {setIsPlaying(true)}}
              onTouchEnd={() => {setIsPlaying(false)}}
              pin={true}
              onLoad={setRangePinStyle}
          >
            <IonIcon icon={pulse} slot="start" />
          </IonRange>
        </IonItem>

        <IonItem>
          <IonRange
              min={minWpm.current} 
              max={maxWpm.current} 
              defaultValue={state.wpm}
              value={state.wpm}
              onIonChange={wpmChange}
              pin={true}
              onLoad={setRangePinStyle}
          >
            <IonIcon icon={speedometer} slot="start" />
          </IonRange>
        </IonItem>
      </IonContent>
    </IonMenu>
  )
};

let wpmInputStyle = {
    textAlign: 'right',
    fontSize: '20px',
    paddingRight: '30px'
  }
  
export default withRouter(SettingsMenu);
  