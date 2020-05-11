import React, { useState } from 'react';

import Header from './components/Header/Header';
import GameManager from './components/GameManager/GameManager';
import { LanguageContext } from './context/LanguageContext';

function App() {
  const [language, setLanguage] = useState('en');

  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Header />
        <GameManager />
      </LanguageContext.Provider>
    </>
  );
}

export default App;
