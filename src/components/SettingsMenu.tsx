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
  } from '@ionic/react';
  import React, { useState, useContext, useRef, useEffect } from 'react';
  import { RouteComponentProps, withRouter } from 'react-router-dom';
  import { AppPage } from '../declarations';
  import './Menu.scss';
import { square, play } from 'ionicons/icons';
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

    const min = useRef(200);
    const max = useRef(1000);

    function changeFrequency(e: any){
      dispatch({ type: "setFrequency", payload: e.target.value });
      tone.current.setFrequency(e.target.value);
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

    function toneChange(e: any){
      dispatch({
        type: 'setToneType',
        payload: e.target.value
      });
      tone.current.setTone(e.target.value);
    }

    function wpmChange(e: any){
      console.log('wpmChange');
      dispatch({
        type: 'setWpm',
        payload: e.target.value
      })
      tone.current.setWpm(e.target.value);
    }

    useEffect(() => {
      console.log('useEffect Settings', state);
    }, [state]);

    useEffect(() => {
          if (isPlaying){
              tone.current.startTone();
          } else {
              tone.current.stopTone();
          }
    }, [isPlaying]);

    useIonViewDidEnter(() => {
        console.log('ionViewDidEnter event fired');
      });
    
    useIonViewDidLeave(() => {
    console.log('ionViewDidLeave event fired');
    });

    useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
    });

    useIonViewWillLeave(() => {
    console.log('ionViewWillLeave event fired');
    });
    
    return (
    <IonMenu menuId="settings" contentId="settingsMenu" type="overlay" side="end">
      <IonHeader className="MenuHeader">
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="settingsMenu" className="MenuBody">
      <IonItem>
        <IonLabel>Theme</IonLabel>
        <IonSelect onIonChange={changeTheme}>
          <IonSelectOption value="light">Light</IonSelectOption>
          <IonSelectOption value="dark">Dark</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel>Difficulty</IonLabel>
        <IonSelect onIonChange={changeDifficulty}>
          <IonSelectOption value="beginner">Beginner</IonSelectOption>
          <IonSelectOption value="intermediate">Intermediate</IonSelectOption>
          <IonSelectOption value="expert">Expert</IonSelectOption>
        </IonSelect>
      </IonItem>
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
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
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
        <IonItem>
            <IonLabel>
              WPM
            </IonLabel>
            <IonInput 
              slot="end"
              type="number" 
              value={state.wpm.toString()} 
              onIonChange={wpmChange}
              style={wpmInputStyle}
            >  
            </IonInput>
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
  