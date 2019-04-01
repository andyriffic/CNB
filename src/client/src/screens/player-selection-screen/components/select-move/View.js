/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import styled from 'styled-components';
import type { MakeMoveSelection } from '../../types';
import { media, PageSubTitle } from '../../../styled';
import ItemCardSelection from '../../../../components/item-card-selection';
import GameThemeContext from '../../../../contexts/GameThemeContext';
import { FeatureToggle } from '../../../../featureToggle';

const SelectionList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  ${media.largeScreen`
      flex-direction: row;
      padding: 5px;
    `}
`;

const SelectionListItem = styled.li`
  margin: 0;
  padding: 0;
  list-style-type: none;
  flex-basis: 30%;
  overflow: hidden;
  margin-bottom: 10px;
  flex: 1;

  ${media.largeScreen`      
      padding: 5px;
    `}
`;

const ListContainer = styled.div`
  //width: 100vw;
  //height: 60vh;
  //border: 2px solid white;
`;

const View = ({ onSelection }: MakeMoveSelection) => {
  const theme = useContext(GameThemeContext);
  const items = Object.keys(theme.characters.selectMoveMapping).map(key => {
    const Component = theme.characters.selectMoveMapping[key];
    return <Component />;
  });

  const selectCharacter = index => {
    const move = Object.keys(theme.characters.selectMoveMapping)[index];
    onSelection && onSelection(move);
  };

  return (
    <React.Fragment>
      <PageSubTitle>
        Make your move 做你的動作
        <FeatureToggle feature="swipe">
          {toggleEnabled =>
            !toggleEnabled && (
              <a href={`${window.location.href}?feature=swipe`}>Swipe</a>
            )
          }
        </FeatureToggle>
      </PageSubTitle>

      <FeatureToggle feature="swipe">
        {toggleEnabled =>
          toggleEnabled ? (
            <ListContainer>
              <ItemCardSelection
                items={items}
                onItemSelected={selectCharacter}
              />
            </ListContainer>
          ) : (
            <SelectionList>
              {Object.keys(theme.characters.selectMoveMapping).map(key => {
                const Component = theme.characters.selectMoveMapping[key];
                return (
                  <SelectionListItem key={key}>
                    <Component onSelection={onSelection} />
                  </SelectionListItem>
                );
              })}
            </SelectionList>
          )
        }
      </FeatureToggle>
    </React.Fragment>
  );
};

export default View;
