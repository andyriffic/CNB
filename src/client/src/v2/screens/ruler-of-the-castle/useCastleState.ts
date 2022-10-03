import { useEffect, useState } from 'react';
import { Player, usePlayersProvider } from '../../providers/PlayersProvider';

type UseCastleStateResult = {
  defendingPlayer?: CastlePlayer;
  attackingPlayer?: CastlePlayer;
};

export type WhatsHappening = '';

export type CastlePlayerPosition =
  | 'in-castle'
  | 'approaching-castle'
  | 'leaving-castle';

export type CastlePlayer = {
  player?: Player;
  position: CastlePlayerPosition;
};

export const useCastleState = (): UseCastleStateResult => {
  const { allPlayers } = usePlayersProvider();
  const [state, setState] = useState<UseCastleStateResult>({});

  useEffect(() => {
    const defendingPlayer = allPlayers.find(p =>
      p.tags.includes('castle_defender')
    );
    const attackingPlayer = allPlayers.find(p =>
      p.tags.includes('castle_attacker')
    );

    setState({
      attackingPlayer: {
        player: attackingPlayer,
        position: 'approaching-castle',
      },
      defendingPlayer: {
        player: defendingPlayer,
        position: 'in-castle',
      },
    });
  }, []);
  return state;
};
