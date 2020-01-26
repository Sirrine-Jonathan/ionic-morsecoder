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
                    <IonMenuToggle menu="main" autoHide={false}>
                        <IonIcon icon={home} />
                    </IonMenuToggle>
                </IonButtons>
                <IonTitle className="title">{ title }</IonTitle>
                <IonButtons
                    slot="end"
                    className="rightButtonContainer"
                >
                    <IonMenuToggle menu="settings" autoHide={false}>
                        <IonIcon icon={settings} />
                    </IonMenuToggle>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header; 