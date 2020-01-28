import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Matchup } from '../../../contexts/MatchupProvider';
import { Button } from '../../../../screens/styled';
import winSpongebob from './gifs/win-spongebob.gif';
import winParty from './gifs/win-party.gif';
import winHammer from './gifs/win-hammer.gif';
import winPooh from './gifs/win-pooh.gif';
import loseCloud from './gifs/lose-cloud.gif';
import loseHeart from './gifs/lose-heart.gif';
import loseLisa from './gifs/lose-lisa.gif';
import loseMouse from './gifs/lose-mouse.gif';

import { SecondaryButton } from '../../../components/SecondaryButton';
import { selectRandomOneOf } from '../../../utils/random';
import { useDoOnce } from '../../../hooks/useDoOnce';

type PlayerGameStatus = 'PlayingNow' | 'Draw' | 'Win' | 'Lose' | '¯_(ツ)_/¯';

const Image = styled.img`
  width: 40vw;
`;

const winningImages = [winSpongebob, winParty, winHammer, winPooh];
const losingImages = [loseCloud, loseHeart, loseLisa, loseMouse];

export const PlayerGameResult = ({
  matchup,
  teamId,
  backToMatchups,
}: {
  matchup: Matchup | undefined;
  teamId: string;
  backToMatchups: () => void;
}) => {
  const [winningGif] = useState(selectRandomOneOf(winningImages));
  const [losingGif] = useState(selectRandomOneOf(losingImages));

  useDoOnce(
    !!matchup && !!matchup.gameInProgress && matchup.gameInProgress.viewed,
    () => {
      console.log('GAME VIEWED');
      window.navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
    }
  );

  if (!(matchup && matchup.gameInProgress && matchup.gameInProgress.result)) {
    return null;
  }

  let displayText = '';
  let displayEmoji = '';
  let displayGif: React.ReactNode;
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
      displayGif = <img style={{ width: '40vw' }} src={winningGif} />;
    } else {
      displayText = 'Your team lost';
      displayGif = <img style={{ width: '40vw' }} src={losingGif} />;
    }
  }

  return (
    <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
      <p>{displayText}</p>
      <p>
        <span style={{ display: 'block', fontSize: '5rem' }}>
          {displayEmoji}
          {displayGif}
        </span>
      </p>
      {showBackButton && (
        <React.Fragment>
          <p>Wait here for the next game</p>
          <p>OR</p>
          <SecondaryButton onClick={backToMatchups}>
            Change player
          </SecondaryButton>
        </React.Fragment>
      )}
    </div>
  );
};
