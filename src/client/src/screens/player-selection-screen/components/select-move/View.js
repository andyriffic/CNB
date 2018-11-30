/* @flow */
import React from 'react';
import styled from 'styled-components';
import type { MakeMoveSelection } from '../../types';
import { PageSubTitle } from '../../../styled';
import { selectMoveComponentMapping } from '../../../../themes/cowboy-ninja-bear'

const SelectionList = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const SelectionListItem = styled.li`
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex-basis: 30%;
    overflow: hidden;
    margin-bottom: 10px;
    flex: 1;
`

const View = ({ onSelection }: MakeMoveSelection) => {
  return (
    <React.Fragment>
        <PageSubTitle>Make your move 做你的動作</PageSubTitle>
        <SelectionList>
          {Object.keys(selectMoveComponentMapping).map(key => {
            const Component = selectMoveComponentMapping[key];
            return (
              <SelectionListItem>
                <Component onSelection={ onSelection }/>
              </SelectionListItem>
            )
          })}
        </SelectionList>
    </React.Fragment>
  )
}

export default View;
