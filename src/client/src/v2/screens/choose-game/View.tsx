import React from 'react';
import { NavigateFn } from '@reach/router';
import styled from 'styled-components';
import { FeatureText, SubHeading } from '../../components/ui/Atoms';
import { GameScreen } from '../../components/ui/GameScreen';
import { PressableButton } from '../../components/ui/PressableButton';
import { selectRandomOneOf } from '../../../uplift/utils/random';

const Container = styled.div`
  width: 790px;
  margin: 0 auto 50px auto;
`;

type Games = 'mob' | 'gas' | 'gamble';

const GameActions: { [key in Games]: (navigate?: NavigateFn) => void } = {
  mob: navigate => navigate && navigate('/mob/start'),
  gas: navigate => navigate && navigate('/gas/start'),
  gamble: () => (window.location.href = 'https://test.finx-rocks.com/join'),
};

const GameButton = styled(PressableButton)`
  font-size: 1rem;
  text-transform: uppercase;
  flex: 1;
  padding: 0;
`;

type Props = {
  navigate: NavigateFn | undefined;
};

export default ({ navigate }: Props) => {
  const selectRandomGame = () => {
    const randomGame = selectRandomOneOf(['mob', 'gas', 'gamble'] as Games[]);
    GameActions[randomGame](navigate);
  };

  return (
    <GameScreen scrollable={true}>
      <Container>
        <FeatureText>Select your game</FeatureText>
        <div
          style={{
            display: 'flex',
            marginTop: '50px',
            justifyContent: 'space-evenly',
            gap: '20px',
          }}
        >
          <GameButton onClick={() => GameActions['mob'](navigate)}>
            👨‍👩‍👧‍👦 Mob
          </GameButton>
          <GameButton onClick={() => GameActions['gas'](navigate)}>
            🎈 Balloon
          </GameButton>
          <GameButton onClick={() => GameActions['gamble']()}>
            🎰 Gamble
          </GameButton>
        </div>
      </Container>
      <SubHeading>OR</SubHeading>
      <Container>
        <div
          style={{
            display: 'flex',
            marginTop: '50px',
            justifyContent: 'space-evenly',
            gap: '20px',
          }}
        >
          <GameButton onClick={selectRandomGame}>🤷‍♂️ Random 🤷‍♂️</GameButton>
        </div>
      </Container>
    </GameScreen>
  );
};
