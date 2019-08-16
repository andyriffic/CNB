import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Game } from '../../../contexts/MatchupProvider';
import { Button } from '../../../../screens/styled';
import { useGameViewTimingEffect } from '../hooks/useGameViewTimingEffect';
import { GameThemeContext } from '../../../contexts/ThemeProvider';
import { PlayerWithMoveReveal } from './PlayerWithMoveReveal';
import { StampText } from '../../../components/stamp-text';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SoundService, SOUND_KEYS } from '../../../../sounds/SoundService';
import { withDoOnce } from '../../../hooks/withDoOnce';

const MovesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerSide = styled.div`
  flex: 1;
  text-align: center;
`;

const PlayerCharacter = styled.img`
  width: 20vmin;
  height: 30vmin;
`;

type GameResultProps = {
  game: Game;
  gameViewFinished: () => void;
};

export const GameResult = ({ game, gameViewFinished }: GameResultProps) => {
  const { themedMoves } = useContext(GameThemeContext);
  const soundService = useContext<SoundService>(GameSoundContext);
  const gameTiming = useGameViewTimingEffect(gameViewFinished);

  const draw = !!game.result!.draw;

  withDoOnce(gameTiming.shownCharacter, () => {
    soundService.play(SOUND_KEYS.DRUMROLL);
  })

  useEffect(() => {
    if (gameTiming.shownResult) {
      // soundService.play(SOUND_KEYS.MOVE_IT_MUSIC);
      setTimeout(() => {
        soundService.play(SOUND_KEYS.STAMP);
      }, 800);
    }
  }, [gameTiming.shownResult]);

  return (
    <div>
      <MovesContainer className="margins-off">
        {game.moves.map((move, index) => {
          const winner =
            game.result!.winnerIndex !== undefined &&
            index === game.result!.winnerIndex;
          return (
            <div
              className="margins-off"
              key={index}
              style={{ margin: '0 auto', position: 'relative' }}
            >
              <PlayerSide>
                <PlayerWithMoveReveal
                  playerAvatarUrl={move.playerAvatarUrl!}
                  revealPlayer={gameTiming.shownCharacter}
                  revealMove={gameTiming.shownMove}
                  move={themedMoves[game.result!.moves[index].moveId]}
                  position={index === 0 ? 'LEFT' : 'RIGHT'}
                  winner={winner}
                  revealResult={gameTiming.shownResult}
                  playWinnerAnimation={gameTiming.shownWinnerMoveAnimation}
                  playLoserAnimation={gameTiming.shownLoserMoveAnimation}
                />
              </PlayerSide>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-30%',
                }}
                className="margins-off"
              >
                <StampText
                  text="Winner!"
                  show={gameTiming.shownResult && winner}
                />
              </div>
            </div>
          );
        })}
      </MovesContainer>
    </div>
  );
};
