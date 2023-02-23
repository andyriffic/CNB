import React from 'react';
import { NavigateFn } from '@reach/router';
import styled from 'styled-components';
import { FancyLink } from '../../../components/FancyLink';
import { FeatureText } from '../../components/ui/Atoms';
import { GameScreen } from '../../components/ui/GameScreen';
import { PressableButton } from '../../components/ui/PressableButton';

const Container = styled.div`
  width: 790px;
  margin: 0 auto 50px auto;
`;

const GameButton = styled(PressableButton)`
  font-size: 2rem;
  text-transform: uppercase;
  flex: 1;
`;

type Props = {
  navigate: NavigateFn | undefined;
};

export default ({ navigate }: Props) => {
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
          <GameButton onClick={() => navigate && navigate('/mob/start')}>
            👨‍👩‍👧‍👦 Mob
          </GameButton>
          <GameButton onClick={() => navigate && navigate('/gas/start')}>
            🎈 Balloon
          </GameButton>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '50px',
            justifyContent: 'space-evenly',
            gap: '20px',
          }}
        >
          <FancyLink href="https://test.finx-rocks.com/join">
            New Game! (that doesn't have a name yet)
          </FancyLink>
        </div>
      </Container>
    </GameScreen>
  );
};
