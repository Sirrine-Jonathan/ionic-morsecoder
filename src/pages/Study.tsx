import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import Dictionary from '../util/dictionary';
import React from 'react';
import SymbolListItem from '../components/SymbolListItem';
import Header from '../components/Header';

const ListPage: React.FC = () => {
  return (
    <IonPage>
      <Header title="Study" />
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
      nonAlpha.push(<SymbolListItem key={index} symbol={each} />);
      return false;
    }
    return (<SymbolListItem key={index} symbol={each} />);
  });
  items = items.concat(nonAlpha);


  return <IonList>{items}</IonList>;
};

export default ListPage;
