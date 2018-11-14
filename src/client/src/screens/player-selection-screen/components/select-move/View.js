/* @flow */
import React from 'react';
import styled from 'styled-components';
import { Cowboy, Ninja, Bear } from './move-symbols';

const SelectionList = styled.ul`
    margin: 0;
    padding: 20px;
`;

const SelectionListItem = styled.li`
    margin: 0;
    padding: 0;
    list-style-type: none;
`

const View = () => {
  return (
    <SelectionList>
        <SelectionListItem><Cowboy/></SelectionListItem>
        <SelectionListItem><Ninja/></SelectionListItem>
        <SelectionListItem><Bear/></SelectionListItem>
    </SelectionList>
  )
}

export default View;
