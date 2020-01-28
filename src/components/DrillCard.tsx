import { IonCard, IonText, IonPopover, IonIcon } from "@ionic/react";
import React, { useState, useContext, useRef, useEffect } from "react";
import Dictionary from './../util/dictionary';
import '../theme/style.scss';
import { square, play } from "ionicons/icons";
import { AppContext } from "../State";
import { TonePlayer } from "../util/sound";

interface DrillCardProps {
    title: string
}

const DrillCard: React.FunctionComponent<DrillCardProps> = ({ title }) => {
    const [showPopover, setShowPopover] = useState(false);
    let [isPlaying, setIsPlaying] = useState(false);
    const { state, dispatch } = useContext(AppContext);
    const didMount = useRef(false);
    const tone = useRef<any>(new TonePlayer(
        state.wpm,
        state.frequency,
        state.toneType
    ));

    function togglePlay (){
        setIsPlaying(!isPlaying);
    }
    
    useEffect(() => {
        if (didMount.current){
            if (isPlaying){
                tone.current.setMorse(Dictionary.translate(title));
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
        <>
        <IonPopover
            isOpen={showPopover}
            onDidDismiss={e => setShowPopover(false)}
        >
            <IonText className="popupText">{Dictionary.translate(title)}</IonText>
            <IonIcon 
                icon={(isPlaying) ? square:play} 
                size="medium" 
                className="popoverPlay"
                onClick={togglePlay}
            ></IonIcon>
        </IonPopover>
        <IonCard className="drillCard" onClick={e => setShowPopover(true)}>
            <IonText>{ title }</IonText>
        </IonCard>
        </>
    );
}

export default DrillCard;