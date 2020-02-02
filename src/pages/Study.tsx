import { IonContent, IonIcon, IonList, IonPage, IonText } from '@ionic/react';
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
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { state, dispatch } = useContext(AppContext);
  let symbolList = useRef(getSymbolList());
  let list = useRef(getListWithSpaces());
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
        if (currentIndex < 0){
          setCurrentIndex(currentIndex + 1);
          tone.current.setMorse(Dictionary.translate(
            list.current[0]
          ));
        } else {
          tone.current.setMorse(Dictionary.translate(
            list.current[currentIndex]
          ));
        }
        
        tone.current.play(function(){
          if (currentIndex + 1 >= list.current.length){
            setCurrentIndex(0);
            setPlayingAll(false);
          } else {
            setCurrentIndex(currentIndex + 1);
          }
        });
      } else {
        tone.current.stop();
        setCurrentIndex(-1);
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
          class="playAllIcon"
          icon={(playingAll) ? square:play} 
          onClick={togglePlayAll} 
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

function getListWithSpaces(){
  let list = getSymbolList().join(' ').split('');
  return list;
}

interface StudyItemsProps {
  curIndex: number
}

const ListItems: React.FC<StudyItemsProps> = ({ curIndex }) => {

  let items = getSymbolList().map((each, index) => {
    if (index === (curIndex / 2)){
      return (<SymbolListItem className="studyItem" isPlaying={true} symbol={each} key={index}/>);
    } else {
      return (<SymbolListItem className="studyItem" isPlaying={false} symbol={each} key={index}/>);
    }
  });

  return <IonList className="studyList" lines="none">{items}</IonList>;
};

export default ListPage;
