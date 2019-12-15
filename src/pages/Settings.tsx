import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRange, IonLabel, IonItemDivider, IonButton, IonToggle } from '@ionic/react';
import { play, square } from 'ionicons/icons';
import React, { useState } from 'react';
import Row from '../components/Row';

const SettingsPage: React.FC = () => {
    const [frequency, setFrequency] = useState(440);
    const [context, setContext] = useState();
    const [oscillator, setOscillator] = useState();
    const [gainNode, setGainNode] = useState();
    const [rangeClass, setRangeClass] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
  
    function startOsc(){ 
      console.log("on");
      if(!isPlaying){
        let ctx = new AudioContext();
        let osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
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
      console.log("off");
      if (isPlaying){
        gainNode.gain.setTargetAtTime(0, context.currentTime, 0.015);
        setIsPlaying(false);
      }
    }

    function changeFrequency(e: any){
      setFrequency(e.target.value);
      console.log(frequency);
      if (oscillator){
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      }
    }

    function changeTheme(e: any){
      console.log(e);
    }
    
    function changeSound(e: any){
      console.log(e);
      setRangeClass('hidden');
    }

    function changeVibrate(e: any){
      console.log(e);
    }

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
          <IonLabel>Light Theme</IonLabel>
          <IonToggle value="theme" onChange={changeTheme} />
        </IonItem>
      <IonItemDivider>
        <IonLabel>
          Sound
        </IonLabel>
      </IonItemDivider>
        <IonItem>
          <IonLabel>Vibrate</IonLabel>
          <IonToggle onChange={changeVibrate} />
        </IonItem>
        <IonItem>
          <IonLabel>Tone</IonLabel>
          <IonToggle onChange={changeSound} />
        </IonItem>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <IonRange 
            min={250} 
            max={550} 
            defaultValue={440}
            value={440}
            pin={true} 
            onClick={changeFrequency}
            onBlur={changeFrequency}
            className={rangeClass}
        >
          <IonLabel slot="start">250 Hz</IonLabel>
          <IonLabel slot="end">550 Hz</IonLabel>
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
      </IonContent>
    </IonPage>
  );
};  

export default SettingsPage;
