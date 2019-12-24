import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRange, IonLabel, IonItemDivider, IonButton, IonToggle, IonInput } from '@ionic/react';
import { play, square } from 'ionicons/icons';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Row from '../components/Row';
import { AppContext } from '../State';

const SettingsPage: React.FC = () => {
    const [context, setContext] = useState();
    const [oscillator, setOscillator] = useState();
    const [gainNode, setGainNode] = useState();
    const [rangeClass, setRangeClass] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    const { state, dispatch } = useContext(AppContext);

    const min = useRef(200);
    const max = useRef(1000);
  
    function startOsc(){ 
      if(!isPlaying){
        let ctx = new AudioContext();
        let osc = ctx.createOscillator();
        osc.type = "sine";
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
      console.log(e);
      setRangeClass('hidden');
    }

    function changeVibrate(e: any){
      console.log(e);
    }

    useEffect(() => {
      console.log('useEffect Settings', state);
    }, [state])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <IonItemDivider>
        <IonLabel>
          Theme
        </IonLabel>
      </IonItemDivider>
        <IonItem>
          <IonLabel>Dark Theme</IonLabel>
          <IonToggle value="theme" onIonChange={changeTheme} />
        </IonItem>
      <IonItemDivider>
        <IonLabel>
          Sound
        </IonLabel>
      </IonItemDivider>
        <IonItem>
          <IonLabel>Vibrate</IonLabel>
          <IonToggle onIonChange={changeVibrate} />
        </IonItem>
        <IonItem>
          <IonLabel>Tone</IonLabel>
          <IonToggle onIonChange={changeSound} />
        </IonItem>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <IonRange 
            min={min.current} 
            max={max.current} 
            defaultValue={state.frequency}
            value={state.frequency}
            pin={true} 
            onIonChange={changeFrequency}
            className={rangeClass}
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
        </div>
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
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
            <IonLabel>
              WPM
            </IonLabel>
            <IonInput type="number" value="20" onChange={(e) => {console.log('wpm changed', e)}}>
              
            </IonInput>
        </div>
      </IonContent>
    </IonPage>
  );
};  

export default SettingsPage;
