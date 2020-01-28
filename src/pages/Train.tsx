import { IonPage, IonInput, IonButton } from "@ionic/react"
import React from "react"
import Header from "../components/Header"

const TrainPage: React.FC = () => {
    return (
      <IonPage>
        <Header title="Train" showSettings={true} />
        <div className="page-content">
          <IonButton></IonButton>
          <IonInput className="trainInput"></IonInput>
        </div>
      </IonPage>
    )
}
export default TrainPage;