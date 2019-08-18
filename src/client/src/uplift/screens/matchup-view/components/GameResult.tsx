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
import { useDoOnce } from '../../../hooks/useDoOnce';
import { TrophyAward } from './TrophyAward';

const MovesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerSide = styled.div`
  flex: 1;
  text-align: center;
`;

const TrophyContainer = styled.div<{ position: 'LEFT' | 'RIGHT' }>`
  position: absolute;
  top: 50px;
  ${props => (props.position === 'LEFT' ? 'left' : 'right')}: -50px;
`;

type GameResultProps = {
  game: Game;
  showTrophy: boolean;
  gameViewFinished: () => void;
};

export const GameResult = ({
  game,
  showTrophy,
  gameViewFinished,
}: GameResultProps) => {
  const {
    theme: { moves: themedMoves },
  } = useContext(GameThemeContext);
  const soundService = useContext<SoundService>(GameSoundContext);
  const gameTiming = useGameViewTimingEffect(gameViewFinished);

  const draw = !!game.result!.draw;

  useDoOnce(gameTiming.shownCharacter, () => {
    soundService.play(SOUND_KEYS.DRUMROLL);
  });

  useDoOnce(gameTiming.shownResult && !draw, () => {
    soundService.playForDuration(SOUND_KEYS.ANOTHER_ONE_BITES_THE_DUST, 9000);
  });

  useDoOnce(gameTiming.shownResult, () => {
    setTimeout(() => {
      soundService.play(SOUND_KEYS.STAMP);
    }, 800);
  });

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
                  draw={draw}
                  revealResult={gameTiming.shownResult}
                  playWinnerAnimation={gameTiming.shownWinnerMoveAnimation}
                  playLoserAnimation={gameTiming.shownLoserMoveAnimation}
                />
                {showTrophy && winner && (
                  <TrophyContainer position={index === 0 ? 'LEFT' : 'RIGHT'}>
                    <TrophyAward />
                  </TrophyContainer>
                )}
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
                <StampText
                  text="Draw!"
                  style="average"
                  show={gameTiming.shownResult && draw}
                />
              </div>
            </div>
          );
        })}
      </MovesContainer>
    </div>
  );
};
