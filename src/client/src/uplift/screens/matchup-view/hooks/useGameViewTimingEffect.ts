import { useEffect, useState } from 'react';

export type GameViewTiming = {
  shownCharacter: boolean;
  shownMove: boolean;
  shownResult: boolean;
  gameplayFinished: boolean;
};

export const useGameViewTimingEffect = () => {
  const [shownCharacter, setShownCharacter] = useState(false);
  const [shownMove, setShownMove] = useState(false);
  const [shownResult, setShownResult] = useState(false);
  const [gameplayFinished, setGameplayFinished] = useState(false);

  const gameplayTimeouts: NodeJS.Timeout[] = [];

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

  return {
    shownCharacter,
    shownMove,
    shownResult,
    gameplayFinished,
  };
};
