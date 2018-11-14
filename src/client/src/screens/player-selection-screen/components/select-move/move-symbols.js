import React from 'react';
import styled from 'styled-components';

const SymbolBase = styled.div`
    border: 2px solid black;
    width: 100px;
    height: 100px;
    text-align: center;
    cursor: pointer;

    :hover {
        background-color: #eee;
    }
`;

const StyledCowboy = styled(SymbolBase)`
`;

export const Cowboy = ({ onSelection }) => {
    return (
        <StyledCowboy onClick={ () => onSelection('cowboy') }>
            <p>Cowboy</p>
            <p>牛仔</p>
        </StyledCowboy>);
}

export const Ninja = ({ onSelection }) => {
    return (
        <StyledCowboy onClick={ () => onSelection('ninja') }>
            <p>Ninja</p>
            <p>忍者</p>
        </StyledCowboy>);
}

export const Bear = ({ onSelection }) => {
    return (
        <StyledCowboy onClick={ () => onSelection('bear') }>
            <p>Bear</p>
            <p>熊</p>
        </StyledCowboy>);
}