/* @flow */
import React, { useContext } from 'react';
import styled from 'styled-components';
import type { MakeMoveSelection } from '../../types';
import { media, PageSubTitle } from '../../../styled';
import GameThemeContext from '../../../../contexts/GameThemeContext';

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

const View = ({ onSelection }: MakeMoveSelection) => {
  const theme = useContext(GameThemeContext);

  return (
    <React.Fragment>
      <PageSubTitle>Make your move 做你的動作</PageSubTitle>
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
    </React.Fragment>
  );
};

export default View;
