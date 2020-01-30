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
    isPlaying?: boolean,
}

const SymbolListItem: React.FC<SymbolListItemProps> = ({ symbol, className, isPlaying} ) => {
    let [isPlayingInner, setIsPlayingInner] = useState(false);
    const { state, dispatch } = useContext(AppContext);
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