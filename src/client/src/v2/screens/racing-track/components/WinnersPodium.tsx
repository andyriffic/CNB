import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { RacingPlayer } from '../types';

type Props = {
  racers: RacingPlayer[];
};

const Container = styled.div`
  position: absolute;
`;
const PlayerContainer = styled.div``;
const PlayerName = styled.div``;

const sortFinishPosition = (a: RacingPlayer, b: RacingPlayer): 1 | -1 => {
  if (a.finishPosition === undefined || b.finishPosition === undefined) {
    return -1;
  }
  return a.finishPosition < b.finishPosition ? -1 : 1;
};

export const WinnersPodium = ({ racers }: Props): JSX.Element => {
  const finishedPlayers = useMemo(() => {
    const finishers = racers
      .filter(rp => !!rp.finishPosition)
      .sort(sortFinishPosition);
    return finishers.slice(0, Math.min(finishers.length, 6));
  }, [racers]);

  return (
    <>
      {finishedPlayers.map((rp, i) => (
        <Container
          key={rp.player.id}
          style={{ top: '390px', left: `${i * 65 + 410}px` }}
        >
          <PlayerContainer>
            <PlayerAvatar player={rp.player} size="small" showZodiac={false} />
          </PlayerContainer>
          {/* <div>{rp.finishPosition}</div> */}
        </Container>
      ))}
    </>
  );
};
