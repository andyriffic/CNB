import React from 'react';
import styled from 'styled-components';
import { Matchup } from '../../../contexts/MatchupProvider';
import { Button } from '../../../../screens/styled';

type PlayerGameStatus = 'PlayingNow' | 'Draw' | 'Win' | 'Lose' | '¯_(ツ)_/¯';

export const PlayerGameResult = ({
  matchup,
  teamId,
  backToMatchups,
}: {
  matchup: Matchup | undefined;
  teamId: string;
  backToMatchups: () => void;
}) => {
  if (!(matchup && matchup.gameInProgress && matchup.gameInProgress.result)) {
    return null;
  }

  let displayText = '';
  let displayEmoji = '';
  let showBackButton = true;

  if (!matchup.gameInProgress.viewed) {
    displayText = 'Playing right now!';
    displayEmoji = '👀';
    showBackButton = false;
  } else if (matchup.gameInProgress.result.draw) {
    displayText = 'It was a draw';
    displayEmoji = '😐';
  } else {
    const winningTeam =
      matchup.teams[matchup.gameInProgress.result.winnerIndex!];
    const isWinner = winningTeam.id === teamId;
    if (isWinner) {
      displayText = 'Your team won!';
      displayEmoji = '🎉';
    } else {
      displayText = 'Your team lost';
      displayEmoji = '😢';
    }
  }

  return (
    <div style={{ fontSize: '2rem', textAlign: 'center' }}>
      <p>{displayText}</p>
      <p>
        <span style={{ display: 'block', fontSize: '5rem' }}>
          {displayEmoji}
        </span>
      </p>
      {showBackButton && (
        <Button type="button" onClick={backToMatchups}>
          Back to my Match-ups
        </Button>
      )}
    </div>
  );
};
