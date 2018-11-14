import React from 'react';
import { CowboySelector, NinjaSelector, BearSelector } from '../select-move/move-symbols';
import { PageSubTitle } from '../../../styled';

const moveComponentMapping = {
    cowboy: CowboySelector,
    ninja: NinjaSelector,
    bear: BearSelector,
}

const View = ({selectedMove}) => {
    const Component = moveComponentMapping[selectedMove];
    return (
        <React.Fragment>
            <PageSubTitle>You chose 你选择了</PageSubTitle>
            <Component selected={ true }/>
        </React.Fragment>
    )
}

export default View;
