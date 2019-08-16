import React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SpectatorMove } from '../../../contexts/MatchupProvider';
import { WaitingContentContainer } from '../../../components/waiting-content-container';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SoundService } from '../../../contexts/types';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import { withDoOnce } from '../../../hooks/withDoOnce';

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

  withDoOnce(moves[0].moved, () => {
    soundService.play(SOUND_KEYS.PLAYER_JOINED_GAME);    
  })

  withDoOnce(moves[1].moved, () => {
    soundService.play(SOUND_KEYS.PLAYER_JOINED_GAME);    
  })

  return (
    <Container className="margins-off">
      {moves.map((move, i) => (
        <MoveContainer key={i}>
          <WaitingContentContainer
            loaded={move.moved}
            style={{ margin: '0 auto' }}
          >
            {move.moved ? (
              <PlayerName>{move.playerName}</PlayerName>
            ) : (
              'Waiting for move...'
            )}
          </WaitingContentContainer>
        </MoveContainer>
      ))}
    </Container>
  );
};
