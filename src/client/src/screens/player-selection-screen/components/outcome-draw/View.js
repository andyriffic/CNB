import React from 'react';import styled from 'styled-components';

const Emoji = styled.span`
    font-size: 70px;
`

const View = ({selectedMove}) => {
    return (
        <React.Fragment>
            <p>IT'S A DRAW!</p>
            <p>这是一个平局</p>
            <p><Emoji role="img" aria-label="neutral face">😐</Emoji></p>
        </React.Fragment>
    )
}

export default View;
