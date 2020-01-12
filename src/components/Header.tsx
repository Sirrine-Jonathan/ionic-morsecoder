import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon, IonRouterLink, IonBackButton } from "@ionic/react";
import React from "react";
import './Header.scss';
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
                { (showSettings) 
                    ? 
                    (
                        <IonButtons
                            slot="end"
                            className="rightButtonContainer"
                        >
                            <IonRouterLink href="/home/settings">
                                <IonIcon icon={settings} className="rightButton"></IonIcon>
                            </IonRouterLink>
                        </IonButtons>
                    )
                    :
                    null 
                }
                { (showHome) 
                    ? 
                    (
                        <IonButtons
                            slot="end"
                            className="rightButtonContainer"
                        >
                            <IonBackButton className="rightButton"/>
                            {/*
                            <IonRouterLink href="/home">
                                <IonIcon icon={home} className="rightButton"></IonIcon>
                            </IonRouterLink>
                            */}
                        </IonButtons>
                    )
                    :
                    null 
                }
            </IonToolbar>
        </IonHeader>
    )
}

export default Header; 