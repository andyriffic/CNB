import React, { useContext } from 'react';
import styled from 'styled-components';

import Firework from '../characters/firework';
import Nian from '../characters/nian';
import Pig from '../characters/pig';
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

const symbolSize = selected => (selected ? 50 : 30);

export const FireworkSelector = ({ onSelection, selected, loser }) => {
  const theme = useContext(GameThemeContext);
  return (
    <StyledCharacter
      selectable={!!onSelection}
      selected={selected}
      onClick={() => onSelection && onSelection('A')}
    >
      <Title selected={selected}>{theme.characters.nameMapping['A']}</Title>
      <SymbolContainer selected={selected}>
        <Firework loser={loser} />
      </SymbolContainer>
    </StyledCharacter>
  );
};

export const NianSelector = ({ onSelection, selected, loser }) => {
  const theme = useContext(GameThemeContext);
  return (
    <StyledCharacter
      selectable={!!onSelection}
      selected={selected}
      onClick={() => onSelection && onSelection('B')}
    >
      <Title selected={selected}>{theme.characters.nameMapping['B']}</Title>
      <SymbolContainer selected={selected}>
        <Nian loser={loser} />
      </SymbolContainer>
    </StyledCharacter>
  );
};

export const PigSelector = ({ onSelection, selected, loser }) => {
  const theme = useContext(GameThemeContext);
  return (
    <StyledCharacter
      selectable={!!onSelection}
      selected={selected}
      onClick={() => onSelection && onSelection('C')}
    >
      <Title selected={selected}>{theme.characters.nameMapping['C']}</Title>
      <SymbolContainer selected={selected}>
        <Pig loser={loser} />
      </SymbolContainer>
    </StyledCharacter>
  );
};
