import React, { ReactNode, useCallback, useEffect, useReducer } from 'react';
import { Player } from '../../../providers/PlayersProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { RacingPlayer, RacingTrack } from '../types';
import { createInitialState, GAME_PHASE, reducer } from './racingTrackReducer';

export type RacingTrackService = {
  gamePhase: GAME_PHASE;
  racingTrack: RacingTrack;
  racers: RacingPlayer[];
  autoMovePlayerTick: () => void;
  allPlayersMoved: boolean;
  savePlayerState: () => void;
};

const RacingTrackContext = React.createContext<RacingTrackService | undefined>(
  undefined
);

export const RacingTrackServiceProvider = ({
  children,
  racingTrack,
  participatingPlayers,
  savePlayer,
}: {
  children: ReactNode;
  racingTrack: RacingTrack;
  participatingPlayers: Player[];
  savePlayer: (playerId: string, tags: string[]) => void;
}) => {
  const { play } = useSoundProvider();
  const [gameState, dispatch] = useReducer(
    reducer,
    { racingTrack, participatingPlayers },
    createInitialState
  );

  const savePlayerState = useCallback(() => {
    dispatch({
      type: 'SYNC_DATA_TO_SERVER',
      saveData: racingPlayer => {
        const filteredTags = racingPlayer.player.tags
          .filter(t => !t.startsWith('rt_section'))
          .filter(t => !t.startsWith('rt_lane'))
          .filter(t => !t.startsWith('rt_square'))
          .filter(t => !t.startsWith('rt_moves'));
        savePlayer(racingPlayer.player.id, [
          ...filteredTags,
          `rt_section:${racingPlayer.position.sectionIndex}`,
          `rt_lane:${racingPlayer.position.laneIndex}`,
          `rt_square:${racingPlayer.position.squareIndex}`,
          `rt_moves:${racingPlayer.movesRemaining}`,
        ]);
      },
    });
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('Updating from server');
  //   dispatch({
  //     type: 'SYNC_DATA_FROM_SERVER',
  //     allPlayers: participatingPlayers,
  //   });
  // }, [participatingPlayers]);

  useEffect(() => {
    if (gameState.soundEffect) {
      play(gameState.soundEffect);
    }
  }, [gameState.soundEffect]);

  return (
    <RacingTrackContext.Provider
      value={{
        gamePhase: gameState.gamePhase,
        racingTrack,
        racers: gameState.racers,
        autoMovePlayerTick: () => dispatch({ type: 'AUTO_MOVE_PLAYER' }),
        allPlayersMoved: gameState.allPlayersMoved,
        savePlayerState,
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
