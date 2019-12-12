import React, { useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon
  } from '@ionic/react';
import EventfulButton from '../components/EventfulButton';
import TimingTool from '../components/TimingTool';
import TextInput from '../components/TextInput';
import './Home.css';

const HomePage: React.FC = () => {

  const [percent, setPercent] = useState(0);
  const [isPushed, setIsPushed] = useState(false);
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(20);

  function getBasicUnit(){
    return 2.4 / wpm;
  }

  function buttonPress(){
    setIsPushed(true);
  }

  function buttonRelease(){
    setIsPushed(false);
  } 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Morse Coder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="page-content">
        <TextInput></TextInput>
        <TimingTool percent={1} buttonPressed={isPushed} />
        <EventfulButton
          onPress={buttonPress}
          onRelease={buttonRelease}
        >
          <IonIcon name="keypad" />
        </EventfulButton>
      </div>
    </IonPage>
  );
};

export default HomePage;
