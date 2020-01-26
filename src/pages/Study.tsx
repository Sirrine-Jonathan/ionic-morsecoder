import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonRow } from '@ionic/react';
import Dictionary from '../util/dictionary';
import React, { useState, useRef, useContext, useEffect } from 'react';
import SymbolListItem from '../components/SymbolListItem';
import Header from '../components/Header';
import '../theme/style.scss';
import { square, play } from 'ionicons/icons';
import { TonePlayer, GlobalPlayer } from '../util/sound';
import { AppContext } from '../State';

const ListPage: React.FC = () => {
  const [playingAll, setPlayingAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { state, dispatch } = useContext(AppContext);
  let symbolList = useRef(getSymbolList());
  const didMount = useRef(false);
  const tone = useRef<any>(GlobalPlayer);

  function togglePlayAll(){
    if (playingAll){
      setPlayingAll(false);
    } else {
      setPlayingAll(true);
    }
  }

  useEffect(() => {
    if (didMount.current){
        if (playingAll){
            tone.current.setMorse(Dictionary.translate(
              symbolList.current[currentIndex]
            ));
            tone.current.play(function(){
              if (currentIndex + 1 >= symbolList.current.length){
                setCurrentIndex(0);
                setPlayingAll(false);
              } else {
                setCurrentIndex(currentIndex + 1);
              }
            });
        } else {
            tone.current.stop();
        }
    } else {
        didMount.current = true;
    }
  }, [playingAll, currentIndex]);

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
        <ListItems curIndex={currentIndex}/>
      </IonContent>
    </IonPage>
  );
};

function getSymbolList(){
  let dictionaryArr = Dictionary.getKeyArray();
  let dictionary = dictionaryArr.sort();
  let nonAlpha: any[] = [];
  let items = dictionary.filter((each, index) => {
    if (each == " ") return null;
    let alphareg = new RegExp(/^[a-zA-Z]+$/);
    if (!each.match(alphareg)){
      nonAlpha.push(each);
      return null;
    }
    return each;
  });
  items = items.concat(nonAlpha);
  return items;
}

interface StudyItemsProps {
  curIndex: number
}

const ListItems: React.FC<StudyItemsProps> = ({ curIndex }) => {

  let items = getSymbolList().map((each, index) => {
    if (index === curIndex){
      return (<SymbolListItem className="studyItem studyItemPlaying" symbol={each} key={index}/>);
    } else {
      return (<SymbolListItem className="studyItem" symbol={each} key={index}/>);
    }
  });

  return <IonList className="studyList" lines="none">{items}</IonList>;
};

export default ListPage;
