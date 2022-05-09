import React from 'react';
import styled, { css } from 'styled-components';
import { GameScreen } from '../../components/ui/GameScreen';
import { FeatureText } from '../../components/ui/Atoms';
import { useGameHistory } from '../../../uplift/hooks/useGameHistory';
import { NavigateFn } from '@reach/router';
import { Button } from '../../components/ui/buttons';
import { PressableButton } from '../../components/ui/PressableButton';
import { Heading } from '../../../components/form/radio-select/styles';

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
      </Container>
    </GameScreen>
  );
};
