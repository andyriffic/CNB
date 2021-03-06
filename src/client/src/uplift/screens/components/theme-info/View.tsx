import React from 'react';
import styled from 'styled-components';
import { GameTheme } from '../../../contexts/ThemeProvider';
import { MoveInfo as MoveInfoThree } from './MoveInfo_3';
import { MoveInfo as MoveInfoFive } from './MoveInfo_5';
import { MainHeading } from '../../../components/Heading';

const Container = styled.div<{ theme: GameTheme }>`
  text-align: center;
  margin-top: 0.5em;
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
      <MainHeading>{theme.name.english}</MainHeading>

      <MoveInfoContainer className="margins-off">
        {Object.keys(theme.moves).length === 3 && (
          <MoveInfoThree
            moves={[theme.moves.A, theme.moves.B, theme.moves.C]}
          />
        )}
        {Object.keys(theme.moves).length === 5 && (
          <MoveInfoFive moves={theme.moves} />
        )}
      </MoveInfoContainer>
    </Container>
  );
};
