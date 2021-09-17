import React, { ReactNode, useReducer } from 'react';
import { Player } from '../../../providers/PlayersProvider';
import { RacingPlayer, RacingTrack } from '../types';
import { createInitialState, reducer } from './racingTrackReducer';

export type RacingTrackService = {
  racingTrack: RacingTrack;
  racers: RacingPlayer[];
  autoMovePlayerTick: () => void;
  allPlayersMoved: boolean;
};

const RacingTrackContext = React.createContext<RacingTrackService | undefined>(
  undefined
);

export const RacingTrackServiceProvider = ({
  children,
  racingTrack,
  participatingPlayers,
}: {
  children: ReactNode;
  racingTrack: RacingTrack;
  participatingPlayers: Player[];
}) => {
  const [gameState, dispatch] = useReducer(
    reducer,
    createInitialState(racingTrack, participatingPlayers)
  );

  return (
    <RacingTrackContext.Provider
      value={{
        racingTrack,
        racers: gameState.racers,
        autoMovePlayerTick: () => dispatch({ type: 'AUTO_MOVE_PLAYER' }),
        allPlayersMoved: gameState.allPlayersMoved,
      }}
    >
      {children}
    </RacingTrackContext.Provider>
  );
};

export function useRacingTrack() {
  const context = React.useContext(RacingTrackContext);
  if (context === undefined) {
    throw new Error('useRacingTrack must be used within a RacingTrackContext');
  }
  return context;
}
