import React from 'react';
import { PageSubTitle } from '../../../styled';
import { selectMoveComponentMapping } from '../../../../themes/cowboy-ninja-bear'

const View = ({selectedMove, title, loser}) => {
    const Component = selectMoveComponentMapping[selectedMove];
    return (
        <React.Fragment>
            <PageSubTitle>{ title }</PageSubTitle>
            <Component selected={ true } loser={ loser }/>
        </React.Fragment>
    )
}

export default View;
