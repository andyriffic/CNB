import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { usePlayer } from './usePlayer';
import { usePlayerMatchups } from './usePlayerMatchups';

type Props = {
  playerId: string;
  matchupId: string;
} & RouteComponentProps;

export const PlayMatchupView = ({ playerId, matchupId }: Props) => {
  const player = usePlayer(playerId);
  const playerMatchups = usePlayerMatchups(playerId);
  const [matchup, setMatchup] = useState(
    playerMatchups && playerMatchups.find(m => m.id === matchupId)
  );

  useEffect(() => {
    if (matchup || !playerMatchups) {
      return;
    }
    setMatchup(playerMatchups.find(m => m.id === matchupId));
  }, [matchup, playerMatchups]);

  return (
    <FullPageScreenLayout
      title="Play Matchup"
      alignTop={true}
      scrollable={false}
    >
      {player && (
        <>
          <p>Player: {player.name}</p>
          <p>Matchup: {matchupId}</p>
        </>
      )}
    </FullPageScreenLayout>
  );
};
