import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon } from "@ionic/react";
import React from "react";
import '../theme/style.scss';
import { menu, options } from "ionicons/icons";

interface HeaderProps {
    title: string,
    showSettings?: boolean,
    showHome?: boolean,
}

const Header: React.FC<HeaderProps> = ({ 
    title,
 }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons 
                    slot="start"
                    className="menuButtonContainer"
                >
                    <IonMenuButton menu="main" id="mainMenu" autoHide={false}>
                        <IonIcon icon={menu} className="menuIcon" />
                    </IonMenuButton>
                </IonButtons>
                <IonTitle className="title">{ title }</IonTitle>
                <IonButtons
                    slot="end"
                    className="rightButtonContainer"
                >
                    <IonMenuButton menu="settings" id="settingsMenu" autoHide={false}>
                        <IonIcon icon={options} className="menuIcon settingsMenuIcon" />
                    </IonMenuButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header; 