import React from 'react';
import styled from 'styled-components';

import BearImage from '../../../../components/characters/bear';
import NinjaImage from '../../../../components/characters/ninja';
import CowboyImage from '../../../../components/characters/cowboy';

const SymbolBase = styled.div`
    background-color: #ffb758;
    text-align: center;

    ${props => props.selected && `
        width: 100%;
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
    font-size: 1.5rem;
    color: #20253f;
`;

const StyledCharacter = styled(SymbolBase)`
`;

export const Cowboy = ({ onSelection, selected }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('cowboy') }>

            <Title>Cowboy 牛仔</Title>
            <CowboyImage height={30} width={30} />
        </StyledCharacter>);
}

export const Ninja = ({ onSelection, selected }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('ninja') }>

            <Title>Ninja 忍者</Title>
            <NinjaImage height={30} width={30} />
        </StyledCharacter>);
}

export const Bear = ({ onSelection, selected }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('bear') }>

            <Title>Bear 熊</Title>
            <BearImage height={30} width={30} />
        </StyledCharacter>);
}
