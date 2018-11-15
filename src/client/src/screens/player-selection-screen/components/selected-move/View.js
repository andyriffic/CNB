import React from 'react';
import { CowboySelector, NinjaSelector, BearSelector } from '../select-move/move-symbols';
import { PageSubTitle } from '../../../styled';

const moveComponentMapping = {
    cowboy: CowboySelector,
    ninja: NinjaSelector,
    bear: BearSelector,
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
