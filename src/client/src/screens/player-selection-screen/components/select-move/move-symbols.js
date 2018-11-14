import React from 'react';
import styled from 'styled-components';

import BearImage from '../../../../components/characters/bear';
import NinjaImage from '../../../../components/characters/ninja';
import CowboyImage from '../../../../components/characters/cowboy';

const SymbolBase = styled.div`
    border: 2px solid black;
    text-align: center;
    font-size: ${props => props.selected ? '50px' : '30px'};

    ${props => props.selectable && `
        cursor: pointer;
        :hover {
            background-color: #eee;
        }
    `}

`;

const StyledCharacter = styled(SymbolBase)`
`;

export const Cowboy = ({ onSelection, selected }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('cowboy') }>

            <p>Cowboy</p>
            <p>牛仔</p>
            <CowboyImage height={50} width={50} />
        </StyledCharacter>);
}

export const Ninja = ({ onSelection, selected }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('ninja') }>

            <p>Ninja</p>
            <p>忍者</p>
            <NinjaImage height={50} width={50} />
        </StyledCharacter>);
}

export const Bear = ({ onSelection, selected }) => {
    return (
        <StyledCharacter selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('bear') }>

            <p>Bear</p>
            <p>熊</p>
            <BearImage height={50} width={50} />
        </StyledCharacter>);
}
