import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { usePlayer } from './usePlayer';
import { usePlayerMatchups } from './usePlayerMatchups';
import { MatchupContext, GAME_STATUS } from '../../contexts/MatchupProvider';
import { SelectMove } from './components/SelectMove';
import { GameThemeContext } from '../../contexts/ThemeProvider';
import { PlayerGameResult } from './components/PlayerGameResult';
import { AwardedPowerup } from './components/AwardedPowerup';

type Props = {
  playerId: string;
  matchupId: string;
} & RouteComponentProps;

export const PlayMatchupView = ({ playerId, matchupId, navigate }: Props) => {
  const player = usePlayer(playerId);
  const { setTheme } = useContext(GameThemeContext);
  const playerMatchups = usePlayerMatchups(playerId);
  const { subscribeToMatchup, currentMatchup } = useContext(MatchupContext);
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
    <FullPageScreenLayout
      title="Play Matchup"
      alignTop={true}
      scrollable={false}
    >
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
    </FullPageScreenLayout>
  );
};
