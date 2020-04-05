import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { usePlayer } from './usePlayer';
import { usePlayerMatchups } from './usePlayerMatchups';
import { MatchupContext } from '../../contexts/MatchupProvider';
import { SelectMove } from './components/SelectMove';
import { GameThemeContext } from '../../contexts/ThemeProvider';

type Props = {
  playerId: string;
  matchupId: string;
} & RouteComponentProps;

export const PlayMatchupView = ({ playerId, matchupId }: Props) => {
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
      {player && matchup && (
        <>
          <SelectMove
            matchupId={matchupId}
            player={player}
            teamId={matchup.playerTeamId}
          />
        </>
      )}
    </FullPageScreenLayout>
  );
};
