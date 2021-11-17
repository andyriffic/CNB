import React, { useRef } from 'react';
import styled from 'styled-components';
import { shuffleArray } from '../../../../uplift/utils/random';
import { Button } from '../../../components/ui/buttons';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobGame, MugPlayer } from '../../../providers/MobProvider';
import { MoveKeys } from '../../../themes';
import lifeHeart from '../../mob/spectator/assets/life-heart.png';

const Lives = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Life = styled.img`
  width: 30px;
`;

type Props = {
  mobGame: MobGame;
  mugPlayer: MugPlayer;
  makeMove: (moveId: MoveKeys) => void;
  onGameOver: () => void;
};

export const MugPlay = ({
  mobGame,
  mugPlayer,
  makeMove,
  onGameOver,
}: Props) => {
  const themeComponents = useThemeComponents();

  const won =
    mobGame.roundState === 'viewed' &&
    mugPlayer.lives > 0 &&
    mobGame.mobPlayers.every(mp => !mp.active);
  const lost = mobGame.roundState === 'viewed' && mugPlayer.lives === 0;
  const selectMove =
    !mugPlayer.lastMoveId && mobGame.roundState === 'waiting-moves';

  const randomisedMoves = useRef(shuffleArray<MoveKeys>(['A', 'B', 'C']));

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>{mobGame.id}</h3>
      {/* <Lives>
        {[...Array(mugPlayer.lives)].map((l, i) => (
          <Life key={i} src={lifeHeart} />
        ))}
      </Lives> */}
      {lost && <div>The mob was too good 😭</div>}
      {won && <div>You beat the mob! 🎉</div>}
      {selectMove && themeComponents && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          {randomisedMoves.current.map(moveId => (
            <Button
              key={moveId}
              type="button"
              onClick={() => makeMove(moveId)}
              style={{ width: '33%' }}
            >
              {themeComponents.moves[moveId]}
            </Button>
          ))}
        </div>
      )}
      <div>
        {mobGame.gameOver && (
          <Button onClick={onGameOver}>&lt;Back to games</Button>
        )}
      </div>
    </div>
  );
};
