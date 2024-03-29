import { useEffect, useMemo, useReducer, useRef } from 'react';
import { MobGame, MobPlayer } from '../../../../providers/MobProvider';

export type UiMobPlayer = {
  playerId: string;
  revealMove: boolean;
};

export type MobSpectatorViewUiState = {
  mobWinner: boolean;
  mugWinner: boolean;
  playState: PlayState;
  uiMobPlayers: UiMobPlayer[];
  eliminatedPlayers: MobPlayer[];
  newRound: () => void;
  eliminatePlayer: (mobPlayer: MobPlayer) => void;
};

type PlayState =
  | 'waiting-moves'
  | 'ready-to-reveal'
  | 'reveal-moves'
  | 'revealing-moves'
  | 'all-moves-revealed'
  | 'player-won'
  | 'mob-won';

type State = {
  revealedPlayerIndex: number;
  playState: PlayState;
  uiMobPlayers: UiMobPlayer[];
  eliminatedPlayers: MobPlayer[];
};

type ResetAction = {
  type: 'RESET_REVEALED_PLAYER';
  playState?: PlayState;
};

type SetPlayState = {
  type: 'SET_PLAY_STATE';
  value: PlayState;
};

type SetUiMobPlayers = {
  type: 'SET_UI_MOB_PLAYERS';
  value: UiMobPlayer[];
};

type UpdateUiMobPlayer = {
  type: 'UPDATE_UI_MOB_PLAYER';
  value: {
    playerId: string;
    revealed: boolean;
  };
};

type NewRound = {
  type: 'NEW_ROUND';
};

type EliminatePlayer = {
  type: 'ELIMINATE_PLAYER';
  value: MobPlayer;
};

const reducer = (
  state: State,
  action:
    | ResetAction
    | SetPlayState
    | SetUiMobPlayers
    | UpdateUiMobPlayer
    | NewRound
    | EliminatePlayer
): State => {
  switch (action.type) {
    case 'RESET_REVEALED_PLAYER':
      return {
        ...state,
        revealedPlayerIndex: -1,
        playState: action.playState || state.playState,
      };
    case 'SET_UI_MOB_PLAYERS':
      return {
        ...state,
        uiMobPlayers: action.value,
      };
    case 'SET_PLAY_STATE':
      return {
        ...state,
        playState: action.value,
      };
    case 'UPDATE_UI_MOB_PLAYER': {
      const newState: State = {
        ...state,
        playState: 'revealing-moves',
        uiMobPlayers: state.uiMobPlayers.map(uimp => {
          if (uimp.playerId === action.value.playerId) {
            return {
              ...uimp,
              revealMove: action.value.revealed,
            };
          }
          return uimp;
        }),
      };
      return newState;
    }
    case 'ELIMINATE_PLAYER':
      return {
        ...state,
        eliminatedPlayers: [...state.eliminatedPlayers, action.value],
      };
    default:
      return state;
  }
};

// const reducer = ;

const createInitialState = (mobGame?: MobGame): State => ({
  revealedPlayerIndex: -1,
  playState: 'waiting-moves',
  uiMobPlayers: [],
  eliminatedPlayers: mobGame ? mobGame.mobPlayers.filter(mp => !mp.active) : [],
});

export const useMobSpectatorViewUiState = (
  mobGame?: MobGame
): MobSpectatorViewUiState => {
  const initialised = useRef(false);
  const [uiState, dispatch] = useReducer(reducer, createInitialState(mobGame));

  const mugWinner = useMemo(
    () =>
      !!mobGame &&
      mobGame.resolved &&
      mobGame.mugPlayer.lives > 0 &&
      mobGame.mobPlayers.every(mp => !mp.active),
    [mobGame]
  );

  const mobWinner = useMemo(() => !!mobGame && mobGame.mugPlayer.lives === 0, [
    mobGame,
  ]);

  useEffect(() => {
    //Initialising mob ui state
    if (!mobGame || initialised.current) {
      return;
    }
    initialised.current = true;
    const initialisedUiMobPlayers = mobGame.mobPlayers.map<UiMobPlayer>(mp => ({
      playerId: mp.playerId,
      revealMove: !mp.active,
    }));

    dispatch({ type: 'SET_UI_MOB_PLAYERS', value: initialisedUiMobPlayers });
  }, [mobGame]);

  useEffect(() => {
    // Revealing mob moves sequentially
    if (!mobGame) {
      return;
    }
    // if (!mobGame || !(mobGame.ready && mobGame.resolved)) {
    //   dispatch({ type: 'RESET_REVEALED_PLAYER', playState: 'start' });
    //   return;
    // }

    if (mobGame.resolved) {
      let currentIndex = 0;
      const playerIdsToHighlight = mobGame.mobPlayers
        .filter(mp => mobGame.round === mp.lastRound)
        .map(mp => mp.playerId);

      const interval = setInterval(() => {
        dispatch({
          type: 'UPDATE_UI_MOB_PLAYER',
          value: {
            playerId: playerIdsToHighlight[currentIndex],
            revealed: true,
          },
        });
        currentIndex++;
        if (currentIndex === playerIdsToHighlight.length) {
          clearInterval(interval);
          dispatch({ type: 'SET_PLAY_STATE', value: 'all-moves-revealed' });
        }
      }, 2000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [mobGame]);

  return {
    mugWinner,
    mobWinner,
    playState: uiState.playState,
    uiMobPlayers: uiState.uiMobPlayers,
    eliminatedPlayers: uiState.eliminatedPlayers,
    eliminatePlayer: mobPlayer => {
      dispatch({ type: 'ELIMINATE_PLAYER', value: mobPlayer });
    },
    newRound: () => {
      mobGame &&
        mobGame.mobPlayers.forEach(mp => {
          dispatch({
            type: 'UPDATE_UI_MOB_PLAYER',
            value: { playerId: mp.playerId, revealed: !mp.active },
          });
        });
    },
  };
};
