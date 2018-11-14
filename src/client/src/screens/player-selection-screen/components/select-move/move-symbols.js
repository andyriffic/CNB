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

export const Cowboy = () => {
    return (
        <StyledCowboy>
            <p>Cowboy</p>
            <p>牛仔</p>
        </StyledCowboy>);
}

export const Ninja = () => {
    return (
        <StyledCowboy>
            <p>Ninja</p>
            <p>忍者</p>
        </StyledCowboy>);
}

export const Bear = () => {
    return (
        <StyledCowboy>
            <p>Bear</p>
            <p>熊</p>
        </StyledCowboy>);
}