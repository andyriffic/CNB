import React from 'react';
import styled from 'styled-components';
import { GameTheme } from '../../../contexts/ThemeProvider';
import { MoveInfo } from './MoveInfo';

const Container = styled.div<{ theme: GameTheme }>`
  text-align: center;
`;

const ThemeName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
`;

const MoveInfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

type MatchupSummaryViewProps = {
  theme: GameTheme;
};

export default ({ theme }: MatchupSummaryViewProps) => {
  console.log('THEME INFO', theme);
  return (
    <Container className="margins-off">
      <ThemeName>{theme.name.english}</ThemeName>
      <MoveInfoContainer className="margins-off">
        <MoveInfo moves={[theme.moves.A, theme.moves.B, theme.moves.C]} />
      </MoveInfoContainer>
    </Container>
  );
};
