import React from 'react';
import { Cowboy, Ninja, Bear } from '../select-move/move-symbols';

const moveComponentMapping = {
    cowboy: Cowboy,
    ninja: Ninja,
    bear: Bear,
}

const View = ({selectedMove}) => {
    const Component = moveComponentMapping[selectedMove];
    return (<Component selected={ true }/>)
}

export default View;
