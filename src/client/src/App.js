import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import SocketsConnection from './sockets/SocketsConnection';
import ConnectionDetailsContext from './contexts/ConnectionDetailsContext';
import {
  PlayerSelectionScreen,
  SpectatorScreen,
  ResetGameScreen,
  PageLayoutScreen,
  ItemSelectionTestScreen,
  IndividualPlayersTest,
  PlayerStats,
  GameHistory,
} from './screens';
import DebugOutput from './DebugOutput';
import GlobalStyle from './GlobalStyle';
import ScoreboardApi from './scoreboard/ScoreboardApi';
import GameTheme from './themes';
import TrophyPoints from './trophy-points/Provider';

import { IS_PRODUCTION } from './environment';
import PowerUpProvider from './power-ups/PowerUpProvider';
import GameDataProvider from './game-data/GameDataProvider';
import { TournamentInfoView } from './uplift/screens/tournament-info';

const App = () => {
  const connectionDetails = useContext(ConnectionDetailsContext);

  useEffect(() => {
    let envPostfix = '(Staging)';
    if (IS_PRODUCTION) {
      envPostfix = '(Production)';
    }

    document.title = `Cowboy/Ninja/Bear - ${envPostfix}`;
  }, []);

  return (
    <GameTheme>
      <ScoreboardApi>
        <PowerUpProvider>
          <TrophyPoints>
            <GameDataProvider>
              <SocketsConnection>
                <GlobalStyle />
                <Router>
                  <SpectatorScreen path="/" />
                  <TournamentInfoView path="tournament-info" />
                  <PageLayoutScreen path="layouttest" />
                  <IndividualPlayersTest path="players" />
                  <ItemSelectionTestScreen path="itemtest" />
                  <PlayerSelectionScreen path="xian" playerKey={'XIAN'} />
                  <PlayerSelectionScreen path="melb" playerKey={'MELB'} />
                  <PlayerStats path="player-stats" />
                  <GameHistory path="game-history" />
                  <ResetGameScreen path="reset" />
                </Router>
                <DebugOutput data={connectionDetails} />
              </SocketsConnection>
            </GameDataProvider>
          </TrophyPoints>
        </PowerUpProvider>
      </ScoreboardApi>
    </GameTheme>
  );
};

export default App;
