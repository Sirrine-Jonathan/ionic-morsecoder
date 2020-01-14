import { IonCard, IonText } from "@ionic/react";
import React from "react";
import './DrillCard.scss';

interface DrillCardProps {
    title: string
}



const DrillCard: React.FunctionComponent<DrillCardProps> = ({ title }) => {
    return (
        <IonCard className="drillCard">
            <IonText>{ title }</IonText>
        </IonCard>
    );
}

export default DrillCard;