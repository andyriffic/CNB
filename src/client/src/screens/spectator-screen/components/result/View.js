/* @flow */
import React from 'react';
import styled from 'styled-components';

import PlayerResult from '../player-result';
import PlayerScore from '../player-score';
import Draw from '../draw';
import Winner from '../winner';
import Switch from '../../../../components/switch';
import { PlayerSpectatorContainer, PlayerSpectatorSection, Button, PageFooterContainer, Page, PageHeader, PageBody } from '../../../styled';
import { useGetScoreboardUpdate } from './useUpdateWinnerScore';

type Props = {
  result: Object,
  player1: Object,
  player2: Object,
  resetGame: () => void,
}

const View = ( { result, player1, player2, resetGame}: Props ) => {

  const winner = result.winner === 'player1' ? player1 : player2;
  const isPlayer1Winner = (result.winner === 'player1');
  const isPlayer2Winner = (result.winner === 'player2');

  useGetScoreboardUpdate(winner.name);

  return (
    <Page>
      <PageHeader>Result 结果</PageHeader>
      <PageBody column={ true }>
        <PlayerSpectatorContainer>
          <PlayerSpectatorSection>
            <PlayerResult player={player1} isWinner={isPlayer1Winner} otherPlayersMove={player2.move} isDraw={result.draw}/>
            <PlayerScore playerKey={player1.name}/>
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
            <PlayerResult player={player2} isWinner={isPlayer2Winner} otherPlayersMove={player1.move} isDraw={result.draw}/>
            <PlayerScore playerKey={player2.name}/>
       </PlayerSpectatorSection>

        </PlayerSpectatorContainer>
        <PageFooterContainer>
          <Button onClick={resetGame}>Play again</Button>
        </PageFooterContainer>
      </PageBody>
    </Page>
  );
}

export default View;
