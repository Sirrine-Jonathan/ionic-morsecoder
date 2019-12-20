import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react";
import React from "react";
import './Header.scss';

const Header: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons 
                    slot="start"
                    className="buttonContainer"
                >
                <IonMenuButton />
                </IonButtons>
                <IonTitle className="title">mo.-.se code.-.</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header; 