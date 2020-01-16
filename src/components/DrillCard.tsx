import { IonCard, IonText, IonPopover } from "@ionic/react";
import React, { useState } from "react";
import Dictionary from './../util/dictionary';
import './DrillCard.scss';

interface DrillCardProps {
    title: string
}

const DrillCard: React.FunctionComponent<DrillCardProps> = ({ title }) => {
    const [showPopover, setShowPopover] = useState(false);

    return (
        <>
        <IonPopover
                isOpen={showPopover}
                onDidDismiss={e => setShowPopover(false)}
            >
            <IonText className="popupText">{Dictionary.translate(title)}</IonText>
        </IonPopover>
        <IonCard className="drillCard" onClick={e => setShowPopover(true)}>
            <IonText>{ title }</IonText>
        </IonCard>
        </>
    );
}

export default DrillCard;