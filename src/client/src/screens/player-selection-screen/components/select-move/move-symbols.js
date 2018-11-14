import React from 'react';
import styled from 'styled-components';

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

const StyledCowboy = styled(SymbolBase)`
`;

export const Cowboy = ({ onSelection, selected }) => {
    return (
        <StyledCowboy selectable={ !!onSelection } 
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('cowboy') }>

            <p>Cowboy</p>
            <p>牛仔</p>
        </StyledCowboy>);
}

export const Ninja = ({ onSelection, selected }) => {
    return (
        <StyledCowboy selectable={ !!onSelection }
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('ninja') }>

            <p>Ninja</p>
            <p>忍者</p>
        </StyledCowboy>);
}

export const Bear = ({ onSelection, selected }) => {
    return (
        <StyledCowboy selectable={ !!onSelection } 
                      selected={ selected }
                      onClick={ () => onSelection && onSelection('bear') }>

            <p>Bear</p>
            <p>熊</p>
        </StyledCowboy>);
}