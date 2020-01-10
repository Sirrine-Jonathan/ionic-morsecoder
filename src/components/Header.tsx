import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon, IonRouterLink } from "@ionic/react";
import React from "react";
import './Header.scss';
import { settings } from "ionicons/icons";

interface HeaderProps {
    title: string,
    showSettings?: boolean
}

const settingsIconStyle = {
    fontSize: '27px',
    paddingRight: '12px',
    color: 'rgba(0,0,0,0.50)'
}

const Header: React.FC<HeaderProps> = ({ title, showSettings = false }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons 
                    slot="start"
                    className="buttonContainer"
                >
                    <IonMenuButton />
                </IonButtons>
                <IonTitle className="title">{ title }</IonTitle>
                { (showSettings) 
                    ? 
                    (
                        <IonRouterLink slot="end" href="/home/settings">
                            <IonIcon icon={settings} style={settingsIconStyle}></IonIcon>
                        </IonRouterLink>
                    )
                    :
                    null 
                }
            </IonToolbar>
        </IonHeader>
    )
}

export default Header; 