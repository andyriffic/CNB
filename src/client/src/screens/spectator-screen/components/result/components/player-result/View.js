/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import Switch from '../../../../../../components/switch';

import TranslatedPlayerName from '../../../../../../components/translated-player-name';
import GameThemeContext from '../../../../../../contexts/GameThemeContext';
import TrashTalk from '../trash-talk';
import WinGif from '../win-gif';
import PowerUpBadge from '../../../../../../components/power-up-badges';
import { POWER_UP_TYPE } from '../../../../../../power-ups/constants';

type Props = {
  player: Object,
  isWinner: boolean,
  isDraw: boolean,
  otherPlayersMove: string,
  isLeft: boolean,
  setContainerRef: () => void,
  revealPlayersMove: boolean,
  revealPowerUp: boolean,
};

const initialAnimationDelay = 0;

const zoomIn = keyframes`
  0% {
    transform: scale(.1, .1);
  }
  60% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
`;

const dim = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const winnerWobble = keyframes`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.5, 1.5, 1.5) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

const Container = styled.div`
  position: relative;
  background-color: #e9e3c5;
  border-radius: 10px;
  padding: 3vmin;
  width: 32vmin;
  height: 32vmin;

  // &.loser {
  //   animation: ${dim} 2s linear 3500ms 1 forwards;
  // }

  transition: box-shadow 3s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  ${props =>
    props.showHalo && props.reveal
      ? `
  box-shadow:
        inset 0 0 50px #fff,      /* inner white */
        inset 20px 0 80px #f0f,   /* inner left magenta short */
        inset -20px 0 80px #0ff,  /* inner right cyan short */
        inset 20px 0 300px #f0f,  /* inner left magenta broad */
        inset -20px 0 300px #0ff, /* inner right cyan broad */
        0 0 50px #fff,            /* outer white */
        -10px 0 80px #f0f,        /* outer left magenta */
        10px 0 80px #0ff;         /* outer right cyan */
  `
      : ''}
`;

const CharacterPosition = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
  transition: opacity 2s ease;
  opacity: ${props => (props.isWinner ? '1' : '0.3')};
`;

const InitialCharacterAnimaton = styled.div`
  margin: 0 auto;
  height: 150px;
  width: 150px;
  animation: ${zoomIn} 1s linear ${initialAnimationDelay}s 1 forwards;

  &.winner {
    //animation: ${winnerWobble} 2s linear 3s infinite forwards;
  }
`;

const WinnerAnimationContainer = styled.div`
  &.winner {
    animation: ${winnerWobble} 2s linear 3s infinite forwards;
  }
`;

const Title = styled.div`
  margin: 0;
  padding: 5px 0;
  font-size: 1rem;
  color: #20253f;
  text-align: center;
`;

const BadgeContainer = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  display: flex;
  bottom: -12%;
  left: -30%;
`;

const getCharacter = (characterMapping, move, isWinner) => {
  return (
    <Switch>
      {Object.keys(characterMapping).map(key => {
        const CharacterComponent = characterMapping[key];
        return (
          <CharacterComponent
            key={key}
            showIf={move === key}
            loser={!isWinner}
          />
        );
      })}
    </Switch>
  );
};

const PlayerResult = ({
  player,
  isWinner,
  isDraw,
  otherPlayersMove,
  isLeft,
  setContainerRef = () => {},
  revealPlayersMove,
  revealPowerUp,
}: Props) => {
  const theme = useContext(GameThemeContext);
  const characterMapping = theme.characters.characterMapping;

  return (
    <React.Fragment>
      <Container
        ref={setContainerRef}
        showHalo={isWinner}
        reveal={revealPlayersMove}
        className={isWinner ? 'winner' : 'loser'}
      >
        <TrashTalk
          theme={theme}
          isWinner={isWinner}
          player={player}
          isLeft={isLeft}
        />
        <WinGif
          theme={theme}
          isWinner={isWinner}
          player={player}
          isLeft={isLeft}
        />
        <Title>
          <TranslatedPlayerName playerName={player.name} />
        </Title>
        {revealPlayersMove && (
          <CharacterPosition isWinner={isWinner}>
            <WinnerAnimationContainer className={isWinner ? 'winner' : ''}>
              <InitialCharacterAnimaton>
                {getCharacter(characterMapping, player.move, true)}
              </InitialCharacterAnimaton>
            </WinnerAnimationContainer>
            {player.powerUp !== POWER_UP_TYPE.NONE && (
              <BadgeContainer>
                {!revealPowerUp && <PowerUpBadge type="HIDDEN" />}
                {revealPowerUp && <PowerUpBadge type={player.powerUp} />}
              </BadgeContainer>
            )}
          </CharacterPosition>
        )}
      </Container>
    </React.Fragment>
  );
};

export default PlayerResult;
