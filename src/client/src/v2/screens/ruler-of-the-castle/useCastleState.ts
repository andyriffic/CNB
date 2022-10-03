import { useEffect, useState } from 'react';
import { getPlayerIntegerAttributeValue } from '../../../uplift/utils/player';
import { Player, usePlayersProvider } from '../../providers/PlayersProvider';

export type UseCastleStateResult = {
  outcome: boolean;
  defendingPlayer?: CastlePlayer;
  attackingPlayer?: CastlePlayer;
};

export type PlayerMovements = 'arrive' | 'enter-castle' | 'leave-castle';

export type CastleSequence = 'intro' | 'prelude';

export type CastlePlayerPosition =
  | 'inside-castle'
  | 'outside-castle'
  | 'leaving-castle';

export type CastlePlayer = {
  player?: Player;
  position: CastlePlayerPosition;
  battleWinner: boolean;
  points: number;
};

export const useCastleState = (): UseCastleStateResult => {
  const { allPlayers } = usePlayersProvider();
  const [state, setState] = useState<UseCastleStateResult>({ outcome: false });

  useEffect(() => {
    const defendingPlayer = allPlayers.find(p =>
      p.tags.includes('castle_defender')
    );
    const attackingPlayer = allPlayers.find(p =>
      p.tags.includes('castle_attacker')
    );

    const attackingPlayerPlayer: CastlePlayer | undefined = attackingPlayer && {
      player: attackingPlayer,
      position: 'outside-castle',
      points: attackingPlayer
        ? getPlayerIntegerAttributeValue(
            attackingPlayer.tags,
            'castle_points',
            0
          )
        : 0,
      battleWinner:
        !!attackingPlayer &&
        !!attackingPlayer.tags.find(t => t.startsWith('castle_battle_winner')),
    };

    const defendingPlayerPlayer: CastlePlayer | undefined = defendingPlayer && {
      player: defendingPlayer,
      position: 'inside-castle',
      points: defendingPlayer
        ? getPlayerIntegerAttributeValue(
            defendingPlayer.tags,
            'castle_points',
            0
          )
        : 0,
      battleWinner:
        !!defendingPlayer &&
        !!defendingPlayer.tags.find(t => t.startsWith('castle_battle_winner')),
    };

    setState({
      outcome:
        !!(attackingPlayerPlayer && defendingPlayerPlayer) &&
        (attackingPlayerPlayer.battleWinner ||
          defendingPlayerPlayer.battleWinner),
      attackingPlayer: attackingPlayerPlayer,
      defendingPlayer: defendingPlayerPlayer,
    });
  }, []);

  return state;
};
