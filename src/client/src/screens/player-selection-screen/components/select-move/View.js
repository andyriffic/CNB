/* @flow */
import React from 'react';
import styled from 'styled-components';
import { Cowboy, Ninja, Bear } from './move-symbols';
import type { MakeMoveSelection } from '../../types';
import { PageSubTitle } from '../../../styled';

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
`

const View = ({ onSelection }: MakeMoveSelection) => {
  return (
    <React.Fragment>
        <PageSubTitle>Make your move 做你的举动</PageSubTitle>
        <SelectionList>
            <SelectionListItem><Cowboy onSelection={ onSelection }/></SelectionListItem>
            <SelectionListItem><Ninja onSelection={ onSelection }/></SelectionListItem>
            <SelectionListItem><Bear onSelection={ onSelection }/></SelectionListItem>
        </SelectionList>
    </React.Fragment>
  )
}

export default View;
