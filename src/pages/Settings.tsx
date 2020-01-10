import { IonContent, IonIcon, IonItem, 
  IonPage, IonRange, IonLabel, IonItemDivider, 
  IonButton, IonToggle, IonInput, IonSelect, 
  IonSelectOption } from '@ionic/react';
import { play, square } from 'ionicons/icons';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../State';
import Header from '../components/Header';

const SettingsPage: React.FC = () => {
    const [context, setContext] = useState();
    const [oscillator, setOscillator] = useState();
    const [gainNode, setGainNode] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    const { state, dispatch } = useContext(AppContext);

    const min = useRef(200);
    const max = useRef(1000);
  
    function startOsc(){ 
      if(!isPlaying){
        let ctx = new AudioContext();
        let osc = ctx.createOscillator();
        osc.type = state.toneType as OscillatorType;
        osc.frequency.setValueAtTime(state.frequency, ctx.currentTime);
        let gain = ctx.createGain();
        gain.gain.setTargetAtTime(0.2, ctx.currentTime, 0.15);
        osc.connect(gain);
      
        gain.connect(ctx.destination);
        osc.start();
        setIsPlaying(true);
        setContext(ctx);
        setOscillator(osc);
        setGainNode(gain);
      }
    };
  
    function off() {
      if (isPlaying){
        gainNode.gain.setTargetAtTime(0, context.currentTime, 0.015);
        setIsPlaying(false);
      }
    }

    function changeFrequency(e: any){
      dispatch({ type: "setFrequency", payload: e.target.value });
      if (oscillator){
        oscillator.frequency.setValueAtTime(e.target.value, context.currentTime);
      }
    }

    function changeTheme(e: any){
      let themeDark = 'false';
      console.log('dark toggle checked: ', e.target.checked);
      if (e.target.checked){
        themeDark = 'true';
      }
      console.log('dark theme: ', themeDark);
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

    function toneChange(e: any){
      dispatch({
        type: 'setToneType',
        payload: e.target.value
      })
    }

    function wpmChange(e: any){
      dispatch({
        type: 'setWpm',
        payload: e.target.value
      })
    }

    useEffect(() => {
      console.log('useEffect Settings', state);
    }, [state])

  return (
    <IonPage>
      <Header title="Settings" />
      <IonContent>
      <IonItemDivider>
        <IonLabel>
          Theme
        </IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonLabel>Theme</IonLabel>
        <IonSelect onIonChange={changeTheme}>
          <IonSelectOption value="light">Light</IonSelectOption>
          <IonSelectOption value="dark">Dark</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItemDivider>
        <IonLabel>
          Sound
        </IonLabel>
      </IonItemDivider>
        <IonItem>
          <IonLabel>Vibrate</IonLabel>
          <IonToggle onIonChange={changeVibrate} checked={state.vibrate} />
        </IonItem>
        <IonItem>
          <IonLabel>Tone</IonLabel>
          <IonToggle onIonChange={changeSound} checked={state.sound} />
        </IonItem>
        {(state.sound) ? (
        <div>
        <IonItem>
        <IonRange 
            min={min.current} 
            max={max.current} 
            defaultValue={state.frequency}
            value={state.frequency}
            pin={true} 
            onIonChange={changeFrequency}
        >
          <IonLabel slot="start">{ min.current } Hz</IonLabel>
          <IonLabel slot="end">{ max.current } Hz</IonLabel>
        </IonRange>
        <IonButton 
          fill="outline" 
          size="small"
          style={{flex: 1, margin: '0 15px'}}
          onClick={(isPlaying) ? off:startOsc}
        >
          <IonIcon icon={(isPlaying) ? square:play}></IonIcon>
        </IonButton>
        </IonItem>
        <IonItem>
          <IonLabel>Tone Type</IonLabel>
          <IonSelect onIonChange={toneChange}>
            <IonSelectOption value="sine" selected={(state.toneType === 'sine')}>Sine</IonSelectOption>
            <IonSelectOption value="square" selected={(state.toneType === 'square')}>Square</IonSelectOption>
            <IonSelectOption value="sawtooth" selected={(state.toneType === 'sawtooth')}>Sawtooth</IonSelectOption>
            <IonSelectOption value="triangle" selected={(state.toneType === 'triangle')}>Triangle</IonSelectOption>
          </IonSelect>
        </IonItem>
        </div>
        ):null }
        <IonItemDivider>
          <IonLabel>
            Timing
          </IonLabel>
        </IonItemDivider>
        <IonItem>
          <IonLabel>
            Use Timing Tool
          </IonLabel>
          <IonToggle onClick={(e) => {console.log('Use Timing Tool Toggle', e)}} />
        </IonItem>
        <IonItem>
            <IonLabel>
              WPM
            </IonLabel>
            <IonInput 
              slot="end"
              type="number" 
              value={state.wpm.toString()} 
              onChange={wpmChange}
              style={wpmInputStyle}
            >  
            </IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};  

let wpmInputStyle = {
  textAlign: 'right',
  fontSize: '20px',
  paddingRight: '30px'
}

export default SettingsPage;
