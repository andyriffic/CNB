import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PlayersProvider } from './contexts/PlayersContext';
import { PlayerChoiceProvider } from './contexts/PlayerChoiceContext';
import { SoundProvider } from './contexts/SoundContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <PlayersProvider>
    <PlayerChoiceProvider>
      <SoundProvider>
        <App />
      </SoundProvider>
    </PlayerChoiceProvider>
  </PlayersProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
