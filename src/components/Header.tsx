import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon, IonRouterLink, IonBackButton, IonMenuToggle } from "@ionic/react";
import React from "react";
import '../theme/style.scss';
import { settings, menu } from "ionicons/icons";

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
                    <IonMenuButton menu="main" id="mainMenu" autoHide={false}>
                        <IonIcon icon={menu} className="menuIcon mainMenuIcon" />
                    </IonMenuButton>
                </IonButtons>
                <IonTitle className="title">{ title }</IonTitle>
                <IonButtons
                    slot="end"
                    className="rightButtonContainer"
                >
                    <IonMenuButton menu="settings" id="settingsMenu" autoHide={false}>
                        <IonIcon icon={settings} className="menuIcon settingsMenuIcon" />
                    </IonMenuButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header; 