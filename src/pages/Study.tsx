import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonRow } from '@ionic/react';
import Dictionary from '../util/dictionary';
import React, { useState } from 'react';
import SymbolListItem from '../components/SymbolListItem';
import Header from '../components/Header';
import '../theme/style.scss';
import { square, play } from 'ionicons/icons';

const ListPage: React.FC = () => {
  const [playingAll, setPlayingAll] = useState(false);
  
  function togglePlayAll(){
    setPlayingAll(!playingAll);
  }

  return (
    <IonPage>
      <Header title="Study" showSettings={true} />
      <div className="studyControls">
        <IonText>Play All</IonText>
        <IonIcon 
          slot="end" 
          icon={(playingAll) ? square:play} 
          onClick={togglePlayAll} 
          color="#000"
        />
      </div>
      <IonContent>
        <ListItems />
      </IonContent>
    </IonPage>
  );
};

const ListItems = () => {

  let dictionaryArr = Dictionary.getKeyArray();
  let dictionary = dictionaryArr.sort();
  let nonAlpha: any[] = [];
  let items = dictionary.map((each, index) => {
    if (each == " ") return false;
    let alphareg = new RegExp(/^[a-zA-Z]+$/);
    if (!each.match(alphareg)){
      nonAlpha.push(<SymbolListItem symbol={each} key={index}/>);
      return false;
    }
    return (<SymbolListItem className="studyItem" symbol={each} key={index}/>);
  });
  items = items.concat(nonAlpha);


  return <IonList className="studyList" lines="none">{items}</IonList>;
};

export default ListPage;
