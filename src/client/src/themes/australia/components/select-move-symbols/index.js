import React, { useContext } from 'react';
import styled from 'styled-components';

import Kangaroo from '../characters/kangaroo';
import SteveIrwin from '../characters/steve-irwin';
import Didgeridoo from '../characters/didgeridoo';
import GameThemeContext from '../../../../contexts/GameThemeContext';

const SymbolBase = styled.div`
  background-color: #ffb758;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${props =>
    props.selected &&
    `
        width: 100%;
        height: 50vh;
        font-size: 3rem;
    `}

  ${props =>
    props.selectable &&
    `
        cursor: pointer;
        :hover {
            background-color: #ffdcae;
        }
    `}
`;

const Title = styled.div`
  margin: 0;
  padding: 5px 0;
  font-size: ${props => (props.selected ? '3rem' : '1.5rem')};
  color: #20253f;
`;

const SymbolContainer = styled.div`
  width: ${props => (props.selected ? '150px' : '120px')};
  height: ${props => (props.selected ? '150px' : '120px')};
`;

const StyledCharacter = styled(SymbolBase)``;

export const KangarooSelector = ({ onSelection, selected, loser }) => {
  const theme = useContext(GameThemeContext);
  return (
    <StyledCharacter
      selectable={!!onSelection}
      selected={selected}
      onClick={() => onSelection && onSelection('A')}
    >
      <Title selected={selected}>{theme.characters.nameMapping['A']}</Title>
      <SymbolContainer selected={selected}>
        <Kangaroo loser={loser} />
      </SymbolContainer>
    </StyledCharacter>
  );
};

export const SteveIrwinSelector = ({ onSelection, selected, loser }) => {
  const theme = useContext(GameThemeContext);
  return (
    <StyledCharacter
      selectable={!!onSelection}
      selected={selected}
      onClick={() => onSelection && onSelection('B')}
    >
      <Title selected={selected}>{theme.characters.nameMapping['B']}</Title>
      <SymbolContainer selected={selected}>
        <SteveIrwin loser={loser} />
      </SymbolContainer>
    </StyledCharacter>
  );
};

export const DidgeridooSelector = ({ onSelection, selected, loser }) => {
  const theme = useContext(GameThemeContext);
  return (
    <StyledCharacter
      selectable={!!onSelection}
      selected={selected}
      onClick={() => onSelection && onSelection('C')}
    >
      <Title selected={selected}>{theme.characters.nameMapping['C']}</Title>
      <SymbolContainer selected={selected}>
        <Didgeridoo loser={loser} />
      </SymbolContainer>
    </StyledCharacter>
  );
};
