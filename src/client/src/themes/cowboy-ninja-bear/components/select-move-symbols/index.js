import React from 'react';
import styled from 'styled-components';

import Cowboy from '../characters/cowboy';
import Ninja from '../characters/ninja';
import Bear from '../characters/bear';
import TranslatedCharacter from '../../../../components/translated-character-name';

const SymbolBase = styled.div`
    background-color: #ffb758;
    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${props => props.selected && `
        width: 100%;
        height: 50vh;
        font-size: 3rem;
    ` }

    ${props => props.selectable && `
        cursor: pointer;
        :hover {
            background-color: #ffdcae;
        }
    `}
`;

const Title = styled.div`
    margin: 0;
    padding: 5px 0;
    font-size: ${props => props.selected ? '3rem' : '1.5rem'};
    color: #20253f;
`;

const StyledCharacter = styled(SymbolBase)`
`;

const symbolSize = (selected) => selected ? 50 : 30;

export const CowboySelector = ({ onSelection, selected, loser }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('B') }>

            <Title selected={ selected }>
              <TranslatedCharacter character='COWBOY' />
            </Title>
            <Cowboy height={symbolSize(selected)} width={symbolSize(selected)} loser={ loser } />
        </StyledCharacter>);
}

export const NinjaSelector = ({ onSelection, selected, loser }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('A') }>

            <Title selected={ selected }>
              <TranslatedCharacter character='NINJA' />
            </Title>
            <Ninja height={symbolSize(selected)} width={symbolSize(selected)} loser={ loser } />
        </StyledCharacter>);
}

export const BearSelector = ({ onSelection, selected, loser }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('C') }>

            <Title selected={ selected }>
              <TranslatedCharacter character='BEAR' />
            </Title>
            <Bear height={symbolSize(selected)} width={symbolSize(selected)} loser={ loser } />
        </StyledCharacter>);
}
