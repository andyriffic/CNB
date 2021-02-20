import React, { useContext } from 'react';
import styled from 'styled-components';
import { SOCKETS_ENDPOINT } from '../../../environment';
import { GameHistoryRecord } from '../../../uplift/types';
import {
  MoveKeys,
  MoveThemeNames,
  themeComponentMap,
  ThemeComponents,
  ThemeName,
} from '../../themes';

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

const MoveCharacter = styled.div<{
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
  let themeComponents: ThemeComponents | undefined;
  Object.keys(themeComponentMap).forEach(key => {
    if (themeComponentMap[key as ThemeName].moveThemeName === history.theme) {
      themeComponents = themeComponentMap[key as ThemeName];
    }
  });

  if (!themeComponents) {
    return null;
  }
  return (
    <Container className="margins-off">
      <ResultOutcome>
        {getOutcome('player1', history.winner, history.draw)}
        <MoveCharacter position="left">
          {themeComponents.moves[history.player1Move as MoveKeys]}
        </MoveCharacter>
        {history.trophy === 'player1' && '🏆'}
      </ResultOutcome>
      <ResultOutcome>
        {history.trophy === 'player2' && '🏆'}
        <MoveCharacter position="right">
          {themeComponents.moves[history.player2Move as MoveKeys]}
        </MoveCharacter>
        {getOutcome('player2', history.winner, history.draw)}
      </ResultOutcome>
    </Container>
  );
};
