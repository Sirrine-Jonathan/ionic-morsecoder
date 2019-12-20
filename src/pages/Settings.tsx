import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRange, IonLabel, IonItemDivider, IonButton, IonToggle, IonInput } from '@ionic/react';
import { play, square } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import Row from '../components/Row';
import { getItem, setItem } from '../util/storage';
import { DARK_THEME } from '../constants';

const SettingsPage: React.FC = () => {
    const [frequency, setFrequency] = useState(440);
    const [context, setContext] = useState();
    const [oscillator, setOscillator] = useState();
    const [gainNode, setGainNode] = useState();
    const [rangeClass, setRangeClass] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
  
    function startOsc(){ 
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
      let themeDark = 'false';
      console.log('dark toggle checked: ', e.target.checked);
      if (e.target.checked){
        themeDark = 'true';
      }
      console.log('dark theme: ', themeDark);
      setItem(DARK_THEME, themeDark);
      setIsDarkTheme(e.target.checked);
      getTheme();
    }

    async function getTheme(){
      let theme = await getItem(DARK_THEME);
      console.log('from getTheme: ', theme);
      if (theme === undefined || theme === null){
        return theme;
      } else {
        return null;
      }
    }

    useEffect(() => {
      getTheme().then((data) => {
        console.log('use effect', data)
        if (data === 'true'){
          setIsDarkTheme(true);
        } else {
          setIsDarkTheme(false);
        }
      })
    }, []);

    
    
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
          <IonLabel>Dark Theme</IonLabel>
          <IonToggle value="theme" checked={isDarkTheme} onClick={changeTheme} />
        </IonItem>
      <IonItemDivider>
        <IonLabel>
          Sound
        </IonLabel>
      </IonItemDivider>
        <IonItem>
          <IonLabel>Vibrate</IonLabel>
          <IonToggle onClick={changeVibrate} />
        </IonItem>
        <IonItem>
          <IonLabel>Tone</IonLabel>
          <IonToggle onClick={changeSound} />
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
            value={frequency}
            pin={true} 
            onChange={changeFrequency}
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
