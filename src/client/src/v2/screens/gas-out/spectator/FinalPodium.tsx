import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import {
  fadeInDownAnimation,
  fadeInLeftAnimation,
  slideInUpAnimation,
} from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { SubHeading } from '../../../components/ui/Atoms';
import { GasGame } from '../../../providers/GasProvider';
import { PlayerListPlayer } from './PlayerListPlayer';

const Container = styled.div`
  margin-top: 150px;
  animation: ${fadeInDownAnimation} 1500ms ease-in-out 1s 1 both;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const PlacingContainer = styled.div`
  animation: ${fadeInLeftAnimation} 500ms ease-in-out 4s 1 both;
`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Number = styled.div`
  font-size: 0.9rem;
  color: #222;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
  text-align: center;
`;

type Props = {
  game: GasGame;
};

export function FinalPodium({ game }: Props): JSX.Element | null {
  const winningPlayer = useMemo(() => {
    return game.allPlayers.find(p => p.player.id === game.winningPlayerId);
  }, [game]);

  const topGuessPlayers = useMemo(() => {
    if (!game.mvpPlayerIds) {
      return;
    }
    return game.allPlayers.filter(
      p =>
        !!game.mvpPlayerIds &&
        game.mvpPlayerIds.mostCorrectGuesses.includes(p.player.id)
    );
  }, [game]);

  const topPressPlayers = useMemo(() => {
    if (!game.mvpPlayerIds) {
      return;
    }

    return game.allPlayers.filter(
      p =>
        !!game.mvpPlayerIds &&
        game.mvpPlayerIds.mostPresses.includes(p.player.id)
    );
  }, [game]);

  if (!(topGuessPlayers && topPressPlayers && winningPlayer)) {
    return null;
  }

  return (
    <Container>
      <div>
        <PlayerListPlayer
          player={winningPlayer}
          game={game}
          gameOver={true}
          size="smallMedium"
        />
      </div>
      <PlacingContainer>
        <SubHeading style={{ fontSize: '0.8rem' }}>Most Guesses</SubHeading>
        <Number>
          {topGuessPlayers[0] && topGuessPlayers[0].guesses.correctGuessCount}
        </Number>
        <PlayerContainer>
          {topGuessPlayers.map(p => (
            <PlayerAvatar
              key={p.player.id}
              player={p.player}
              size="small"
              showBadges={false}
              showZodiac={false}
            />
          ))}
        </PlayerContainer>
      </PlacingContainer>
      <PlacingContainer>
        <SubHeading style={{ fontSize: '0.8rem' }}>Most Presses</SubHeading>
        <Number>{topPressPlayers[0] && topPressPlayers[0].totalPresses}</Number>
        <PlayerContainer>
          {topPressPlayers.map(p => (
            <PlayerAvatar
              key={p.player.id}
              player={p.player}
              size="small"
              showBadges={false}
              showZodiac={false}
            />
          ))}
        </PlayerContainer>
      </PlacingContainer>
    </Container>
  );
}
