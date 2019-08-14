import { useEffect, useState } from 'react';

export type GameViewTiming = {
  shownCharacter: boolean;
  shownMove: boolean;
  shownWinnerMoveAnimation: boolean;
  shownLoserMoveAnimation: boolean;
  shownResult: boolean;
  gameplayFinished: boolean;
};

export const useGameViewTimingEffect = (finished: () => void) => {
  const [shownCharacter, setShownCharacter] = useState(false);
  const [shownMove, setShownMove] = useState(false);
  const [shownWinnerMoveAnimation, setShownWinnerMoveAnimation] = useState(
    false
  );
  const [shownLoserMoveAnimation, setShownLoserMoveAnimation] = useState(false);
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
                setShownWinnerMoveAnimation(true);

                gameplayTimeouts.push(
                  setTimeout(() => {
                    setShownLoserMoveAnimation(true);

                    gameplayTimeouts.push(
                      setTimeout(() => {
                        setShownResult(true);

                        gameplayTimeouts.push(
                          setTimeout(() => {
                            setGameplayFinished(true);
                            finished();
                          }, 3000) //Finished
                        );
                      }, 1000) // Show result
                    );
                  }, 1000) // show loser move animation
                );
              }, 2000) // show winner move animation
            );
          }, 3000) // Show move
        );
      }, 1000) // Show character
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
    shownWinnerMoveAnimation,
    shownLoserMoveAnimation,
    shownResult,
    gameplayFinished,
  };
};
