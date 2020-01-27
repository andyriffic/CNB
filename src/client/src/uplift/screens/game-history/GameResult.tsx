import React, { useContext } from 'react';
import styled from 'styled-components';
import { PlayersContext } from '../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { StampText } from '../../components/stamp-text';
import { GameHistoryRecord } from '../../types';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ResultOutcome = styled.div``;

type Props = {
  history: GameHistoryRecord;
};

export const GameResult = ({ history }: Props) => {
  return (
    <Container className="margins-off">
      <ResultOutcome>
        {history.winner === 'player1' && history.trophy && '🏆'}
        {history.winner === 'player1' ? '✅' : '❌'}
      </ResultOutcome>
      <ResultOutcome>
        {history.winner === 'player2' ? '✅' : '❌'}
        {history.winner === 'player2' && history.trophy && '🏆'}
      </ResultOutcome>
    </Container>
  );
};
