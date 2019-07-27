import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Game } from '../../../contexts/MatchupProvider';
import { Button } from '../../../../screens/styled';

const MovesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerSide = styled.div`
  flex: 1;
`;

export const GameResult = ({
  game,
  startNewGame,
}: {
  game: Game;
  startNewGame: () => void;
}) => {
  const [shownCharacter, setShownCharacter] = useState(false);
  const [shownMove, setShownMove] = useState(false);
  const [shownResult, setShownResult] = useState(false);
  const [gameplayFinished, setGameplayFinished] = useState(false);

  const gameplayTimeouts: NodeJS.Timeout[] = [];

  const draw = !!game.result!.draw;

  useEffect(() => {
    gameplayTimeouts.push(
      setTimeout(() => {
        setShownCharacter(true);

        gameplayTimeouts.push(
          setTimeout(() => {
            setShownMove(true);

            gameplayTimeouts.push(
              setTimeout(() => {
                setShownResult(true);

                gameplayTimeouts.push(
                  setTimeout(() => {
                    setGameplayFinished(true);
                  }, 1000)
                );
              }, 1000)
            );
          }, 1000)
        );
      }, 1000)
    );

    return () => {
      gameplayTimeouts.forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

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
                {shownCharacter && <p>{move.playerName}</p>}
                {shownMove && <p>{game.result!.moves[index].moveId}</p>}
                {shownResult && <p>{winner ? '✅' : draw ? '➖' : '❌'}</p>}
              </PlayerSide>
            </div>
          );
        })}
      </MovesContainer>
      <div>
        {gameplayFinished && <Button onClick={startNewGame}>New Game</Button>}
      </div>
    </div>
  );
};
