import React, { useState, useRef, useEffect } from "react";
import { IonItem, IonText, IonIcon } from "@ionic/react";
import Dictionary from '../util/dictionary';
import { play, square } from "ionicons/icons";
import { GlobalPlayer } from '../util/sound';

type SymbolListItemProps = {
    symbol: string,
    className?: string,
    isPlaying?: boolean,
}

const SymbolListItem: React.FC<SymbolListItemProps> = ({ symbol, isPlaying} ) => {
    let [isPlayingInner, setIsPlayingInner] = useState(false);
    const didMount = useRef(false);
    const tone = useRef<any>(GlobalPlayer);

    const togglePlay = () => {
        setIsPlayingInner(!isPlaying);
    }

    useEffect(() => {
        if (didMount.current){
            if (isPlayingInner){
                tone.current.setMorse(Dictionary.translate(symbol));
                tone.current.play(function(){
                    setIsPlayingInner(false);
                });
            } else {
                tone.current.stop();
            }
        } else {
            didMount.current = true;
        }
    }, [isPlayingInner]);

    return (
        <IonItem 
            key={Math.random() * 999999999 }
            className="studyItem"
            color="var(--ion-color-primary)"
            onClick={togglePlay}
        >
            <IonText>{ symbol.toUpperCase() }</IonText>
            <IonText className="itemMorse">{ Dictionary.translate(symbol.toLowerCase()) }</IonText>
            <IonIcon slot="end" icon={(isPlayingInner || isPlaying) ? square:play} />
        </IonItem>
    )
}

export default SymbolListItem;