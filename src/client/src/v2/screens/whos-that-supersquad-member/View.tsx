import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { getPlayerAttributeValue } from '../../../uplift/utils/player';
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

const TextContainer = styled.div`
  position: absolute;
  right: 10%;
  bottom: 30%;
  max-width: 40%;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Pokemon Solid', sans-serif;
  font-size: 3.3rem;
  text-align: right;
  color: #fecb03;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: #38649d;
`;

const SubText = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Pokemon Solid', sans-serif;
  font-size: 1.5rem;
  text-align: right;
  color: #fecb03;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #38649d;
`;

type Props = {
  continueUrl: string | null;
  playerId: string | null;
} & RouteComponentProps;

const View = ({ continueUrl, playerId, navigate }: Props) => {
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
      playerId
        ? allPlayers.find(p => p.id === playerId)
        : selectRandomOneOf(
            allPlayers.filter(p => !p.tags.includes('no-whos-that'))
          )
    );
  }, [allPlayers, player]);

  const subTitle = player && getPlayerAttributeValue(player.tags, 'role', '');

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
            <TextContainer>
              <Text>
                {reveal ? player.name : "Who's that Supersquad member?"}
              </Text>
              {reveal && subTitle && <SubText>{subTitle}</SubText>}
            </TextContainer>
          </>
        )}
      </Container>
    </GameScreen>
  );
};

export default View;
