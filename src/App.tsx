import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupConfig } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Study from './pages/Study';
import Settings from './pages/Settings';
import { home, book, school, settings } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { AppContextProvider } from './State';

setupConfig({
  rippleEffect: false,
  mode: 'md',
});

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    icon: home
  },
  {
    title: 'Study',
    url: '/home/study',
    icon: book
  },
  { 
    title: 'Practice',
    url: '/home/practice',
    icon: school
  },
  {
    title: 'Settings',
    url: '/home/settings',
    icon: settings
  }
];

const App: React.FC = () => (
  <AppContextProvider>
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path="/home" component={Home} exact={true} />
          <Route path="/home/study" component={Study} exact={true} />
          <Route path="/home/practice" component={Practice} exact={true} />
          <Route path="/home/settings" component={Settings} exact={true} />
          <Route path="/" render={() => <Redirect to="/home"/> } exact={true} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
  </AppContextProvider>
);

export default App;
