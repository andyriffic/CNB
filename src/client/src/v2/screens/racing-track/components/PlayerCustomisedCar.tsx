import React from 'react';
import { RacingPlayer } from '../types';
import { BubbleCar } from './racing-cars/BubbleCar';
import { FormulaOneCar } from './racing-cars/FormulaOneCar';
import { PacManGhost } from './racing-cars/PacManGhost';
import { SportsCar } from './racing-cars/SportsCar';

type Props = {
  racingPlayer: RacingPlayer;
};

const getCustomCarStyle = (racingPlayer: RacingPlayer): JSX.Element => {
  switch (racingPlayer.carStyle) {
    case 'formula-1':
      return <FormulaOneCar color={racingPlayer.carColor} />;
    case 'bubble':
      return <BubbleCar color={racingPlayer.carColor} />;
    default:
      return <PacManGhost color={racingPlayer.carColor} />; //<SportsCar color={racingPlayer.carColor} />;
  }
};

export const PlayerCustomisedCar = ({ racingPlayer }: Props): JSX.Element => {
  return getCustomCarStyle(racingPlayer);
};
