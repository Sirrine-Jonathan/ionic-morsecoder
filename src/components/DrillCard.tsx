import { IonCard, IonText } from "@ionic/react";
import React from "react";

interface DrillCardProps {
    title: string
}

const cardStyle = {
    fontSize: '20px',
    textAlign: 'center' as 'center',
    padding: '20px',
    backgroundColor: 'crimson',
    color: '#ffffff'
}

const DrillCard: React.FunctionComponent<DrillCardProps> = ({ title }) => {
    return (
        <IonCard style={cardStyle}>
            <IonText>{ title }</IonText>
        </IonCard>
    );
}

export default DrillCard;