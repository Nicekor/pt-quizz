import React, { useState } from 'react';

import Header from './components/Header/Header';
import GameManager from './components/GameManager/GameManager';
import Snackbar from './components/Snackbar/Snackbar';

import { LanguageContext } from './context/LanguageContext';
import uiLabel from './assets/uiLabel.json';

function App() {
  const [language, setLanguage] = useState('en');

  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Header />
        <GameManager />
        <Snackbar message={uiLabel.languageWarning[language]} />
      </LanguageContext.Provider>
    </>
  );
}

export default App;
