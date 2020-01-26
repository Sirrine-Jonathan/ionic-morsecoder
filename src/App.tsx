import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupConfig } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import SettingsMenu from './components/SettingsMenu';
import Tabs from './components/Tabs';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Study from './pages/Study';
import Train from './pages/Train';
import { home, book, school, settings, fitness } from 'ionicons/icons';

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
    title: 'Train',
    url: '/home/train',
    icon: fitness
  }
];

const App: React.FC = () => {

  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  toggleDarkTheme(prefersDark.matches);

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

  // Add or remove the "dark" class based on if the media query matches
  function toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }

  return (
    <AppContextProvider>
    <IonApp>
      <IonReactRouter>
        <Menu appPages={appPages}/>
        <SettingsMenu />
        <IonRouterOutlet id="main">
          <Route path="/home" component={Home} exact={true} />
          <Route path="/home/study" component={Study} exact={true} />
          <Route path="/home/practice" component={Practice} exact={true} />
          <Route path="/home/train" component={Train} exact={true} />
          <Route path="/" render={() => <Redirect to="/home"/> } exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
    </AppContextProvider>
  );
}

export default App;
