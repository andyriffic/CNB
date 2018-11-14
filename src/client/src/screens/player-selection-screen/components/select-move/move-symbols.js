import React from 'react';
import styled from 'styled-components';

const SymbolBase = styled.div`
    border: 2px solid black;
    width: 100px;
    height: 100px;
    text-align: center;

    ${props => props.selectable && `
        cursor: pointer;
        :hover {
            background-color: #eee;
        }
    `}

`;

const StyledCowboy = styled(SymbolBase)`
`;

export const Cowboy = ({ onSelection }) => {
    return (
        <StyledCowboy selectable={ !!onSelection } 
                      onClick={ () => onSelection && onSelection('cowboy') }>

            <p>Cowboy</p>
            <p>牛仔</p>
        </StyledCowboy>);
}

export const Ninja = ({ onSelection }) => {
    return (
        <StyledCowboy selectable={ !!onSelection }
                      onClick={ () => onSelection && onSelection('ninja') }>

            <p>Ninja</p>
            <p>忍者</p>
        </StyledCowboy>);
}

export const Bear = ({ onSelection }) => {
    return (
        <StyledCowboy selectable={ !!onSelection } 
                      onClick={ () => onSelection && onSelection('bear') }>
                      
            <p>Bear</p>
            <p>熊</p>
        </StyledCowboy>);
}