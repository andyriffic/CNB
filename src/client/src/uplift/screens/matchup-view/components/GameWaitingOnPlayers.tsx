import React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SpectatorMove } from '../../../contexts/MatchupProvider';
import { WaitingContentContainer } from '../../../components/waiting-content-container';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SoundService } from '../../../contexts/types';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import { useDoOnce } from '../../../hooks/useDoOnce';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const MoveContainer = styled.div`
  flex: 1;
`;

const PlayerName = styled.p`
  font-size: 1rem;
`;

export const GameWaitingOnPlayers = ({
  moves,
}: {
  moves: [SpectatorMove, SpectatorMove];
}) => {
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    soundService.play(SOUND_KEYS.INTENSE_MUSIC);

    return () => {
      soundService.stop(SOUND_KEYS.INTENSE_MUSIC);
    };
  }, []);

  useDoOnce(moves[0].moved, () => {
    soundService.play(SOUND_KEYS.PLAYER_JOINED_GAME, true);
  });

  useDoOnce(moves[1].moved, () => {
    soundService.play(SOUND_KEYS.PLAYER_JOINED_GAME, true);
  });

  return (
    <Container className="margins-off">
      {moves.map((move, i) => (
        <MoveContainer key={i}>
          <WaitingContentContainer
            loaded={move.moved}
            style={{ margin: '0 auto' }}
          >
            {move.moved ? (
              <PlayerName>
                {move.playerName} {move.usedPowerup && '✨'}
              </PlayerName>
            ) : (
              'Waiting for move...'
            )}
          </WaitingContentContainer>
        </MoveContainer>
      ))}
    </Container>
  );
};
