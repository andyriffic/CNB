/* @flow */
import React from 'react';
import styled from 'styled-components';

import Draw from '../draw';
import Winner from '../winner';
import Switch from '../../../../components/switch';
import { DesktopPageHeader, PlayerSpectatorContainer, PlayerSpectatorSection, Button, PageFooterContainer } from '../../../styled';

type Props = {
  result: Object,
  player1: Object,
  player2: Object,
  resetGame: () => void,
}

const PlayerResult = styled.div`
  border: 1px solid black;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const CenteredText = styled.span`
  align-self: center;
`;

const View = ( { result, player1, player2, resetGame}: Props ) => {
  return (
    <React.Fragment>
      <DesktopPageHeader>Result 结果</DesktopPageHeader>
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection>
          <PlayerResult>
            <CenteredText>{ player1.move }</CenteredText>
            <CenteredText>{ player1.name }</CenteredText>
          </PlayerResult>
        </PlayerSpectatorSection>

        <PlayerSpectatorSection>
          <Switch>
            <Draw showIf={ result.draw } />
            <Winner
              showIf={ !result.draw }
              player1={ player1 }
              player2={ player2 }
              result={ result }
            />
          </Switch>
        </PlayerSpectatorSection>

        <PlayerSpectatorSection>
          <PlayerResult>
            <CenteredText>{ player2.move }</CenteredText>
            <CenteredText>{ player2.name }</CenteredText>
          </PlayerResult>
        </PlayerSpectatorSection>

      </PlayerSpectatorContainer>
      <PageFooterContainer>
        <Button onClick={resetGame}>Play again</Button>
      </PageFooterContainer>
    </React.Fragment>
  );
}

export default View;
