import React, { useState, useContext } from "react";
import { IonItem, IonText, IonIcon } from "@ionic/react";
import Dictionary from '../util/dictionary';
import { attachProps } from "@ionic/react/dist/types/components/utils";
import { play, square } from "ionicons/icons";
import { TonePlayer } from '../util/sound';
import { AppContext } from "../State";

type SymbolListItemProps = {
    symbol: string
}

const SymbolListItem: React.FC<SymbolListItemProps> = ({ symbol }) => {
    let [isPlaying, setIsPlaying] = useState(false);
    const { state, dispatch } = useContext(AppContext);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying){
            let testString = "I am jon";
            let toner = new TonePlayer(Dictionary.translate(testString), state.wpm);
            toner.print();
        } else {

        }
    }

    return (
        <IonItem style={containerStyle}>
            <IonText>{ symbol.toUpperCase() }</IonText>
            <IonText style={morseStyle}>{ Dictionary.translate(symbol) }</IonText>
            <IonIcon slot="end" icon={(isPlaying) ? square:play} onClick={togglePlay}/>
        </IonItem>
    )
}

const containerStyle = {
    fontSize: '20px'
}

const morseStyle = { 
    flex: 1, 
    textAlign: 'center',
    fontSize: '40px' 
}

export default SymbolListItem;