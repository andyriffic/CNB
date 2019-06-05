/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import type { MakeMoveSelection } from '../../types';
import { PageSubTitle, Button } from '../../../styled';
import ItemCardSelection from '../../../../components/item-card-selection';
import GameThemeContext from '../../../../contexts/GameThemeContext';
import { PlayerSelectionCard } from './PlayerSelectionCard';
import { shuffle } from '../../../../utils/suffleArray';

const ListContainer = styled.div`
  //width: 100vw;
  //height: 60vh;
  //border: 2px solid white;
`;
const ButtonContainer = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
`;

const View = ({ onSelection }: MakeMoveSelection) => {
  const theme = useContext(GameThemeContext);
  const [focusCharacterIndex, setFocusCharacterIndex] = useState(0);
  const [characterSelection, setCharacterSelection] = useState({});

  useEffect(() => {
    const randomCharacterMapping = shuffle(
      Object.keys(theme.characters.selectMoveMapping)
    );
    const items = randomCharacterMapping.map(key => {
      return focused => (
        <PlayerSelectionCard moveSymbolKey={key} isFocused={focused} />
      );
    });

    const characterSelection = {
      moveMapping: randomCharacterMapping,
      items,
    };

    setCharacterSelection(characterSelection);
  }, []);

  const selectCharacter = index => {
    const move = characterSelection.moveMapping[index];
    onSelection && onSelection(move);
  };

  return (
    <React.Fragment>
      <PageSubTitle>Make your move 做你的動作</PageSubTitle>
      <ListContainer>
        <ItemCardSelection
          items={characterSelection.items}
          selectedItem={focusCharacterIndex}
          onItemSelected={selectCharacter}
          onItemFocused={index => setFocusCharacterIndex(index)}
        />
      </ListContainer>
      <ButtonContainer>
        <Button onClick={() => selectCharacter(focusCharacterIndex)}>
          Select 選擇
        </Button>
      </ButtonContainer>
    </React.Fragment>
  );
};

export default View;
