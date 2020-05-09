import React, { useState, useMemo } from 'react';

import Header from './components/Header/Header';
import GameManager from './components/GameManager/GameManager';
import { LanguageContext } from './context/LanguageContext';

function App() {
  const [language, setLanguage] = useState('en');

  const languageProviderValue = useMemo(() => ({ language, setLanguage }), [
    language,
  ]);

  return (
    <>
      <LanguageContext.Provider value={languageProviderValue}>
        <Header />
        <GameManager />
      </LanguageContext.Provider>
    </>
  );
}

export default App;
