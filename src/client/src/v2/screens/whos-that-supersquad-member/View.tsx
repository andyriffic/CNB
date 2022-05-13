import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { selectRandomOneOf } from '../../../uplift/utils/random';
import { PlayerAvatar } from '../../components/player-avatar';
import { GameScreen } from '../../components/ui/GameScreen';
import { Player, usePlayersProvider } from '../../providers/PlayersProvider';
import { useSoundProvider } from '../../providers/SoundProvider';
import background from './who-background.webp';

const Container = styled.div`
  margin: 0 auto;
  background: url(${background}) no-repeat top left;
  background-size: contain;
  position: relative;
  padding: 40px 0;
  height: 100%;
`;

const PlayerContainer = styled.div<{ reveal: boolean }>`
  ${({ reveal }) =>
    !reveal &&
    css`
      filter: brightness(0) invert(0);
    `}
  transform: translateX(100px);
  transition: all 100ms linear;
`;

// #E52A21

const Text = styled.p`
  position: absolute;
  right: 10%;
  bottom: 30%;
  font-family: 'Pokemon Solid', sans-serif;
  font-size: 3.3rem;
  max-width: 40%;
  text-align: right;
  color: #fecb03;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: #38649d;
`;

type Props = {
  continueUrl: string | null;
} & RouteComponentProps;

const View = ({ continueUrl, navigate }: Props) => {
  const { allPlayers } = usePlayersProvider();
  const [player, setPlayer] = useState<Player | undefined>();
  const [reveal, setReveal] = useState(false);
  const { play } = useSoundProvider();

  useEffect(() => {
    if (!player) {
      return;
    }
    play('WhosThanIntro');
    setTimeout(() => {
      setReveal(true);
      if (continueUrl) {
        setTimeout(() => {
          navigate && navigate(continueUrl);
        }, 3000);
      }
    }, 3000);
  }, [player]);

  useEffect(() => {
    if (player || allPlayers.length === 0) {
      return;
    }
    setPlayer(
      selectRandomOneOf(
        allPlayers.filter(p => !p.tags.includes('no-whos-that'))
      )
    );
  }, [allPlayers, player]);

  return (
    <GameScreen scrollable={false}>
      <Container>
        {player && (
          <>
            <PlayerContainer reveal={reveal}>
              <PlayerAvatar
                player={player}
                size="large"
                showZodiac={false}
                showBadges={false}
              />
            </PlayerContainer>
            <Text>
              {reveal ? player.name : "Who's that Supersquad member?"}
            </Text>
          </>
        )}
      </Container>
    </GameScreen>
  );
};

export default View;
