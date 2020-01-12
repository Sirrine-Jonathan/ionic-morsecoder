import { IonPage, IonContent } from "@ionic/react";

import React from "react";

import Header from "../components/Header";

const PracticePage: React.FC = () => {
    return (
        <IonPage>
          <Header title="Practice" showSettings={true} />
          <IonContent>
          </IonContent>
        </IonPage>
    );
}

export default PracticePage;