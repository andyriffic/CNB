import React, { useContext } from 'react';
import styled from 'styled-components';
import { PlayersContext } from '../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { StampText } from '../../components/stamp-text';
import { GameHistoryRecord } from '../../types';
import { GameThemeContext } from '../../contexts/ThemeProvider';
import { SOCKETS_ENDPOINT } from '../../../environment';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #fbf6d9;
  align-items: center;
`;

const ResultOutcome = styled.div`
  font-size: 1rem;
  display: flex;
`;

const MoveCharacter = styled.img<{
  position: 'left' | 'right';
}>`
  width: 40px;
  height: 40px;
  ${props => props.position === 'right' && 'transform: scaleX(-1);'}
`;

type Props = {
  history: GameHistoryRecord;
};

const getOutcome = (player: string, winner?: string, draw?: string) => {
  if (draw === 'true') {
    return '➖';
  }

  return player === winner ? '✅' : '❌';
};

export const GameResult = ({ history }: Props) => {
  const { allThemes } = useContext(GameThemeContext);
  const theme = allThemes[history.theme];
  if (!theme) {
    return null;
  }

  return (
    <Container className="margins-off">
      <ResultOutcome>
        {getOutcome('player1', history.winner, history.draw)}
        <MoveCharacter
          position="left"
          src={`${SOCKETS_ENDPOINT}${theme.moves[history.player1Move].imageUrl}`}
        />
        {history.trophy === 'player1' && '🏆'}
      </ResultOutcome>
      <ResultOutcome>
        {history.trophy === 'player2' && '🏆'}
        <MoveCharacter
          position="right"
          src={`${SOCKETS_ENDPOINT}${theme.moves[history.player2Move].imageUrl}`}
        />
        {getOutcome('player2', history.winner, history.draw)}
      </ResultOutcome>
    </Container>
  );
};
