import React, { useState, useContext, useRef, useEffect } from "react";
import { IonItem, IonText, IonIcon } from "@ionic/react";
import Dictionary from '../util/dictionary';
import { attachProps } from "@ionic/react/dist/types/components/utils";
import { play, square } from "ionicons/icons";
import { TonePlayer, GlobalPlayer } from '../util/sound';
import { AppContext } from "../State";

type SymbolListItemProps = {
    symbol: string,
    className?: string,
}

const SymbolListItem: React.FC<SymbolListItemProps> = ({ symbol, className }) => {
    let [isPlaying, setIsPlaying] = useState(false);
    const { state, dispatch } = useContext(AppContext);
    const didMount = useRef(false);
    const tone = useRef<any>(GlobalPlayer);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        if (didMount.current){
            if (isPlaying){
                tone.current.setMorse(Dictionary.translate(symbol));
                tone.current.play(function(){
                    setIsPlaying(false);
                });
            } else {
                tone.current.stop();
            }
        } else {
            didMount.current = true;
        }
    }, [isPlaying]);

    return (
        <IonItem 
            key={Math.random() * 999999999 }
            className="studyItem"
            color="var(--ion-color-primary)"
        >
            <IonText>{ symbol.toUpperCase() }</IonText>
            <IonText className="itemMorse">{ Dictionary.translate(symbol.toLowerCase()) }</IonText>
            <IonIcon slot="end" icon={(isPlaying) ? square:play} onClick={togglePlay} />
        </IonItem>
    )
}

export default SymbolListItem;