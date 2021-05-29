import { useEffect, useMemo, useReducer, useRef } from 'react';
import { MobGame, MobPlayer } from '../../../../providers/MobProvider';

export type UiMobPlayer = {
  playerId: string;
  revealMove: boolean;
};

type MobSpectatorViewUiState = {
  mobWinner: boolean;
  mugWinner: boolean;
  playState: PlayState;
  uiMobPlayers: UiMobPlayer[];
  newRound: () => void;
};

type PlayState = 'start' | 'finished';

type State = {
  revealedPlayerIndex: number;
  playState: PlayState;
  uiMobPlayers: UiMobPlayer[];
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

const reducer = (
  state: State,
  action:
    | ResetAction
    | SetPlayState
    | SetUiMobPlayers
    | UpdateUiMobPlayer
    | NewRound
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
    case 'UPDATE_UI_MOB_PLAYER': {
      const newState = {
        ...state,
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
      console.log('NEW UI STATE', newState);

      return newState;
    }
    default:
      return state;
  }
};

// const reducer = ;

const initialState: State = {
  revealedPlayerIndex: -1,
  playState: 'start',
  uiMobPlayers: [],
};

export const useMobSpectatorViewUiState = (
  mobGame?: MobGame
): MobSpectatorViewUiState => {
  const initialised = useRef(false);
  const [uiState, dispatch] = useReducer(reducer, initialState);

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
    if (!mobGame || initialised.current) {
      return;
    }
    initialised.current = true;
    const initialisedUiMobPlayers = mobGame.mobPlayers.map<UiMobPlayer>(mp => ({
      playerId: mp.player.id,
      revealMove: !mp.active,
    }));

    dispatch({ type: 'SET_UI_MOB_PLAYERS', value: initialisedUiMobPlayers });
  }, [mobGame]);

  useEffect(() => {
    if (!mobGame || !(mobGame.ready && mobGame.resolved)) {
      dispatch({ type: 'RESET_REVEALED_PLAYER', playState: 'start' });
      return;
    }

    if (mobGame.resolved) {
      let currentIndex = 0;
      const playerIdsToHighlight = mobGame.mobPlayers
        .filter(mp => mobGame.round === mp.lastRound)
        .map(mp => mp.player.id);
      console.log('HIGHLIGHT PLAYERS', playerIdsToHighlight);

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
    newRound: () => {
      mobGame &&
        mobGame.mobPlayers.forEach(mp => {
          dispatch({
            type: 'UPDATE_UI_MOB_PLAYER',
            value: { playerId: mp.player.id, revealed: !mp.active },
          });
        });
    },
  };
};
