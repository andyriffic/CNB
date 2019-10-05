import { useEffect, useState } from 'react';

export type GameViewTiming = {
  shownCharacter: boolean;
  shownMove: boolean;
  shownWinnerMoveAnimation: boolean;
  shownLoserMoveAnimation: boolean;
  shownResult: boolean;
  gameplayFinished: boolean;
};

export const useGameViewTimingEffect = (
  resultIsaDraw: boolean,
  timebomb: boolean,
  exploded: boolean,
  finished: () => void
) => {
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
              setTimeout(
                () => {
                  setShownWinnerMoveAnimation(true);

                  gameplayTimeouts.push(
                    setTimeout(
                      () => {
                        !timebomb && setShownLoserMoveAnimation(true);
                        timebomb &&
                          exploded &&
                          gameplayTimeouts.push(
                            setTimeout(
                              () => {
                                setShownLoserMoveAnimation(true);
                              },
                              resultIsaDraw ? 2000 : 4000
                            )
                          );

                        gameplayTimeouts.push(
                          setTimeout(
                            () => {
                              setShownResult(true);

                              gameplayTimeouts.push(
                                setTimeout(
                                  () => {
                                    setGameplayFinished(true);
                                    finished();
                                  },
                                  resultIsaDraw ? 0 : 1000
                                ) //Finished
                              );
                            },
                            resultIsaDraw ? 0 : 1000
                          ) // Show result
                        );
                      },
                      resultIsaDraw ? 0 : 1000
                    ) // show loser move animation
                  );
                },
                resultIsaDraw ? 0 : 2000
              ) // show winner move animation
            );
          }, 4000) // Show move
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
