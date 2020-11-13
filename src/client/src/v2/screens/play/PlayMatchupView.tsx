import React, { useState, useContext, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { usePlayer } from './hooks/usePlayer';
import { usePlayerMatchups } from './hooks/usePlayerMatchups';
import { SelectMove } from './components/SelectMove';
import { PlayerGameResult } from './components/PlayerGameResult';
import { AwardedPowerup } from './components/AwardedPowerup';
import { GameScreen } from '../../components/ui/GameScreen';
import { useMoveThemeProvider } from '../../providers/MoveThemeProvider';
import {
  GAME_STATUS,
  useMatchupProvider,
} from '../../providers/MatchupProvider';
import { SelectBonusChoice } from './components/SelectBonusChoice';
import { DebugBonusChoice } from './components/DebugBonusChoice';
import { isPersistantFeatureEnabled } from '../../../featureToggle';

type Props = {
  playerId: string;
  matchupId: string;
} & RouteComponentProps;

export const PlayMatchupView = ({ playerId, matchupId, navigate }: Props) => {
  const player = usePlayer(playerId);
  const { setTheme } = useMoveThemeProvider();
  const playerMatchups = usePlayerMatchups(playerId);
  const { subscribeToMatchup, currentMatchup } = useMatchupProvider();
  const [teamId, setTeamId] = useState('');

  useEffect(() => {
    subscribeToMatchup(matchupId);
  }, []);

  useEffect(() => {
    if (!currentMatchup) {
      return;
    }

    setTheme(currentMatchup.themeId);
  }, [currentMatchup]);

  useEffect(() => {
    if (!playerMatchups) {
      return;
    }

    const playerMatchup = playerMatchups.find(m => m.id === matchupId);
    if (playerMatchup) {
      setTeamId(playerMatchup.playerTeamId);
    }
  }, [playerMatchups]);

  return (
    <GameScreen scrollable={false} showGameSettings={false}>
      {player && <SelectBonusChoice playerId={player.id} />}
      {player && isPersistantFeatureEnabled('cnb-debug') && (
        <DebugBonusChoice playerId={player.id} />
      )}
      {player && <AwardedPowerup player={player} />}
      {player &&
        teamId &&
        currentMatchup &&
        currentMatchup.gameInProgress &&
        (currentMatchup.gameInProgress.status === GAME_STATUS.Finished ? (
          <PlayerGameResult
            matchup={currentMatchup}
            teamId={teamId}
            backToMatchups={() => {
              navigate && navigate('/play');
            }}
          />
        ) : (
          <SelectMove matchupId={matchupId} player={player} teamId={teamId} />
        ))}
    </GameScreen>
  );
};
