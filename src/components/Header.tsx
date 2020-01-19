import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon, IonRouterLink, IonBackButton, IonMenuToggle } from "@ionic/react";
import React from "react";
import '../theme/style.scss';
import { settings, home } from "ionicons/icons";

interface HeaderProps {
    title: string,
    showSettings?: boolean,
    showHome?: boolean,
}

const Header: React.FC<HeaderProps> = ({ 
    title, 
    showSettings = false,
    showHome = false,
 }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons 
                    slot="start"
                    className="menuButtonContainer"
                >
                    <IonMenuButton />
                </IonButtons>
                <IonTitle className="title">{ title }</IonTitle>
                <IonButtons
                    slot="end"
                    className="rightButtonContainer"
                >
                    <IonMenuToggle id="settings" />
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header; 