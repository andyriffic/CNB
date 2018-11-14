/* @flow */
import React from 'react';
import styled from 'styled-components';
import { Cowboy, Ninja, Bear } from './move-symbols';
import type { MakeMoveSelection } from '../../types';

const SelectionList = styled.ul`
    margin: 0;
    padding: 20px;
`;

const SelectionListItem = styled.li`
    margin: 0;
    padding: 0;
    list-style-type: none;
`

const View = ({ onSelection }: MakeMoveSelection) => {
  return (
    <SelectionList>
        <SelectionListItem><Cowboy onSelection={ onSelection }/></SelectionListItem>
        <SelectionListItem><Ninja onSelection={ onSelection }/></SelectionListItem>
        <SelectionListItem><Bear onSelection={ onSelection }/></SelectionListItem>
    </SelectionList>
  )
}

export default View;
