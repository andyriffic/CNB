/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import styled from 'styled-components';
import type { MakeMoveSelection } from '../../types';
import { PageSubTitle } from '../../../styled';
import ItemCardSelection from '../../../../components/item-card-selection';
import GameThemeContext from '../../../../contexts/GameThemeContext';
import { PlayerSelectionCard } from './PlayerSelectionCard';

const ListContainer = styled.div`
  //width: 100vw;
  //height: 60vh;
  //border: 2px solid white;
`;

const View = ({ onSelection }: MakeMoveSelection) => {
  const theme = useContext(GameThemeContext);
  const items = Object.keys(theme.characters.selectMoveMapping).map(key => {
    return focused => (
      <PlayerSelectionCard moveSymbolKey={key} isFocused={focused} />
    );
  });

  const selectCharacter = index => {
    const move = Object.keys(theme.characters.selectMoveMapping)[index];
    onSelection && onSelection(move);
  };

  return (
    <React.Fragment>
      <PageSubTitle>Make your move 做你的動作</PageSubTitle>
      <ListContainer>
        <ItemCardSelection items={items} onItemSelected={selectCharacter} />
      </ListContainer>
    </React.Fragment>
  );
};

export default View;
