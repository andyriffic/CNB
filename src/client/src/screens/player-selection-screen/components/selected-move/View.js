import React from 'react';
import { CowboySelector, NinjaSelector, BearSelector } from '../select-move/move-symbols';
import { PageSubTitle } from '../../../styled';

const moveComponentMapping = {
    A: NinjaSelector,
    B: CowboySelector,
    C: BearSelector,
}

const View = ({selectedMove, title, loser}) => {
    const Component = moveComponentMapping[selectedMove];
    return (
        <React.Fragment>
            <PageSubTitle>{ title }</PageSubTitle>
            <Component selected={ true } loser={ loser }/>
        </React.Fragment>
    )
}

export default View;
