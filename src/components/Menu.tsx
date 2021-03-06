import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppPage } from '../declarations';
import './Menu.scss';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}
const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => (
  <IonMenu menuId="main" contentId="mainMenu" type="overlay" side="start">
    <IonHeader className="MenuHeader">
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="MenuBody">
      <IonList>
        {appPages.map((appPage, index) => {
          let icon = appPage.icon;
          return (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem routerLink={appPage.url} className="menuItem" routerDirection="none">
                <IonIcon slot="start" icon={icon} className="mainMenuIcon"/>
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          );
        })}
      </IonList>
    </IonContent>
  </IonMenu>
);

export default withRouter(Menu);
