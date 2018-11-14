import React from 'react';
const View = ({selectedMove}) => {
    return (
        <React.Fragment>
            <p>YOU WIN!</p>
            <p>你赢了</p>
            <p><span role="img" aria-label="smiling">😎</span></p>
        </React.Fragment>
    )
}

export default View;
