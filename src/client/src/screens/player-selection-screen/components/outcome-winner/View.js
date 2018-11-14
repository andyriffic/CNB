import React from 'react';
import styled from 'styled-components';

const Emoji = styled.span`
    font-size: 70px;
`

const View = ({selectedMove}) => {
    return (
        <React.Fragment>
            <p>YOU WIN!</p>
            <p>你赢了</p>
            <p><Emoji role="img" aria-label="smiling face with sunglasses">😎</Emoji></p>
        </React.Fragment>
    )
}

export default View;
