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
import { PlayerWithMoveRevealTimebomb } from './PlayerWithMoveRevealTimebomb';
import { RainbowText } from '../../../components/RainbowText';
import { isFeatureEnabled } from '../../../../featureToggle';

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

const PowerupAwardedContainer = styled.div`
  position: absolute;
  bottom: 0;
`;

type GameResultProps = {
  game: Game;
  showTrophy: boolean;
  gameViewFinished: () => void;
};

const powerupsFeatureEnabled = isFeatureEnabled('powerups');

export const GameResult = ({
  game,
  showTrophy,
  gameViewFinished,
}: GameResultProps) => {
  const {
    theme: { moves: themedMoves },
  } = useContext(GameThemeContext);
  const soundService = useContext<SoundService>(GameSoundContext);
  const draw = !!game.result!.draw;

  const gameTiming = useGameViewTimingEffect(
    draw,
    game.playMode === 'Timebomb',
    !!game.attributes.exploded,
    gameViewFinished
  );

  useDoOnce(gameTiming.shownCharacter, () => {
    soundService.play(SOUND_KEYS.ZAP);
  });

  useDoOnce(gameTiming.shownCharacter, () => {
    setTimeout(() => {
      soundService.play(SOUND_KEYS.PUFF);
    }, 1000);
  });

  useDoOnce(gameTiming.shownResult && !draw, () => {
    soundService.playForDuration(SOUND_KEYS.ANOTHER_ONE_BITES_THE_DUST, 9000);
  });

  return (
    <div>
      <MovesContainer className="margins-off">
        {game.moves.map((move, index) => {
          const classicWinner =
            game.result!.winnerIndex !== undefined &&
            index === game.result!.winnerIndex;

          const timebombWinner =
            game.playMode === 'Timebomb' &&
            game.attributes.exploded &&
            index !== game.attributes.playerIndexHoldingTimebomb;

          const winner =
            game.playMode === 'Standard'
              ? classicWinner
              : classicWinner || timebombWinner;

          const showWinnerStamp =
            game.playMode === 'Standard'
              ? winner
              : timebombWinner && showTrophy;

          const showDrawStamp = game.playMode === 'Standard' ? draw : false;

          return (
            <div
              className="margins-off"
              key={index}
              style={{ margin: '0 auto', position: 'relative' }}
            >
              <PlayerSide>
                {game.playMode === 'Standard' && (
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
                )}
                {game.playMode === 'Timebomb' && (
                  <PlayerWithMoveRevealTimebomb
                    playerId={move.playerId}
                    playerAvatarUrl={move.playerAvatarUrl!}
                    revealPlayer={gameTiming.shownCharacter}
                    revealMove={gameTiming.shownMove}
                    move={themedMoves[game.result!.moves[index].moveId]}
                    position={index === 0 ? 'LEFT' : 'RIGHT'}
                    winner={winner}
                    showWinnerMoveHighlight={winner && !draw}
                    draw={draw}
                    revealResult={gameTiming.shownResult}
                    playWinnerAnimation={gameTiming.shownWinnerMoveAnimation}
                    playLoserAnimation={gameTiming.shownLoserMoveAnimation}
                    powerupName={game.result!.moves[index].powerUpId}
                  />
                )}

                {showTrophy && winner && (
                  <TrophyContainer position={index === 0 ? 'LEFT' : 'RIGHT'}>
                    <TrophyAward />
                  </TrophyContainer>
                )}
                {powerupsFeatureEnabled && showTrophy && winner && (
                  <PowerupAwardedContainer>
                    <RainbowText>You earned a Powerup!</RainbowText>
                  </PowerupAwardedContainer>
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
                  show={gameTiming.shownResult && showWinnerStamp}
                />
                <StampText
                  text="Draw!"
                  style="average"
                  show={gameTiming.shownResult && showDrawStamp}
                />
              </div>
            </div>
          );
        })}
      </MovesContainer>
    </div>
  );
};
