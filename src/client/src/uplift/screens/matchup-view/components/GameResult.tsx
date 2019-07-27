import React, { useContext } from 'react';
import styled from 'styled-components';
import { Game } from '../../../contexts/MatchupProvider';
import { Button } from '../../../../screens/styled';
import { useGameViewTimingEffect } from '../hooks/useGameViewTimingEffect';
import { GameThemeContext } from '../../../contexts/ThemeProvider';

const MovesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerSide = styled.div`
  flex: 1;
  text-align: center;
`;

export const GameResult = ({
  game,
  startNewGame,
}: {
  game: Game;
  startNewGame: () => void;
}) => {
  const { themedMoves } = useContext(GameThemeContext);
  const gameTiming = useGameViewTimingEffect();

  const draw = !!game.result!.draw;

  return (
    <div>
      <MovesContainer className="margins-off">
        {game.moves.map((move, index) => {
          const winner =
            game.result!.winnerIndex !== undefined &&
            index === game.result!.winnerIndex;
          return (
            <div key={index} style={{ margin: '0 auto' }}>
              <PlayerSide>
                {gameTiming.shownCharacter && <p>{move.playerName}</p>}
                {gameTiming.shownMove && (
                  <p>
                    {themedMoves[game.result!.moves[index].moveId].name}{' '}
                    {themedMoves[game.result!.moves[index].moveId].translation}
                  </p>
                )}
                {gameTiming.shownResult && (
                  <p>{winner ? '✅' : draw ? '➖' : '❌'}</p>
                )}
              </PlayerSide>
            </div>
          );
        })}
      </MovesContainer>
      <div>
        {gameTiming.gameplayFinished && (
          <Button onClick={startNewGame}>New Game</Button>
        )}
      </div>
    </div>
  );
};
