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

type Props = {
  playerId: string;
  matchupId: string;
} & RouteComponentProps;

export const PlayMatchupView = ({ playerId, matchupId, navigate }: Props) => {
  const player = usePlayer(playerId);
  const { setTheme } = useContext(GameThemeContext);
  const playerMatchups = usePlayerMatchups(playerId);
  const { subscribeToMatchup } = useContext(MatchupContext);
  const [matchup, setMatchup] = useState(
    playerMatchups && playerMatchups.find(m => m.id === matchupId)
  );

  useEffect(() => {
    subscribeToMatchup(matchupId);
  }, []);

  useEffect(() => {
    if (matchup || !playerMatchups) {
      return;
    }
    const thisMatchup = playerMatchups.find(m => m.id === matchupId);
    if (!thisMatchup) {
      return;
    }
    setMatchup(thisMatchup);
    setTheme(thisMatchup.themeId);
  }, [matchup, playerMatchups]);

  return (
    <FullPageScreenLayout
      title="Play Matchup"
      alignTop={true}
      scrollable={false}
    >
      {player &&
        matchup &&
        matchup.gameInProgress &&
        (matchup.gameInProgress.status === GAME_STATUS.Finished ? (
          <PlayerGameResult
            matchup={matchup}
            teamId={matchup.playerTeamId}
            backToMatchups={() => {
              navigate && navigate('/play');
            }}
          />
        ) : (
          <SelectMove
            matchupId={matchupId}
            player={player}
            teamId={matchup.playerTeamId}
          />
        ))}
    </FullPageScreenLayout>
  );
};
