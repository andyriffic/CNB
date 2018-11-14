import React from 'react';
const View = ({selectedMove}) => {
    return (
        <React.Fragment>
            <p>IT'S A DRAW!</p>
            <p>这是一个平局</p>
            <p><span role="img" aria-label="neutral face">😐</span></p>
        </React.Fragment>
    )
}

export default View;
