import React from 'react';
import styled from 'styled-components';

const Emoji = styled.span`
    font-size: 70px;
`

const View = ({selectedMove}) => {
    return (
        <React.Fragment>
            <p>YOU LOSE!</p>
            <p>你输了</p>
            <p><Emoji role="img" aria-label="crying face">😭</Emoji></p>
        </React.Fragment>
    )
}

export default View;
