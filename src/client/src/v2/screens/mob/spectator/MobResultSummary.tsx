import React from 'react';
import styled, { css } from 'styled-components';
import { fadeInAnimation } from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { MobGame } from '../../../providers/MobProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import removedCross from './assets/removed-cross.png';
import winCheck from './assets/win-check.png';

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 100px;
  animation: ${fadeInAnimation} 500ms ease-in 500ms both;
`;

const RoundContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const RoundLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  text-transform: uppercase;
  margin-right: 10px;
  white-space: nowrap;
`;

const RoundPlayers = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ReversedPlayerAvatar = styled.div`
  transform: scaleX(-1);
`;

const RemovedPlayer = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  animation: ${fadeInAnimation} 500ms ease-in 1000ms both;
`;

const WinningPlayer = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  animation: ${fadeInAnimation} 500ms ease-in 1000ms both;
`;

const Points = styled.span`
  display: inline-block;
  /* opacity: 0; */
  position: absolute;
  padding: 5px 8px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%. -50%);
  color: ${({ theme }) => theme.color.text01};
  background-color: ${({ theme }) => theme.color.background02};
  border: 1px solid black;
  border-radius: 10px;
  text-transform: none;
`;

type Props = {
  mobGame: MobGame;
  winner?: 'mob' | 'mug';
};

export function MobResultSummary({ mobGame }: Props): JSX.Element {
  const { play } = useSoundProvider();

  const mugWon = mobGame.mugPlayer.lives > 0;

  const playersPerRound = [...Array(mobGame.round)].map((_, roundNumber) => {
    return mobGame.mobPlayers.filter(mp => mp.lastRound === roundNumber + 1);
  });

  return (
    <Container>
      {playersPerRound.map((roundPlayers, i) => (
        <RoundContainer key={i}>
          <RoundLabel>Round {i + 1}</RoundLabel>
          <RoundPlayers>
            {roundPlayers.map(p => {
              return (
                <div key={p.player.id} style={{ position: 'relative' }}>
                  <ReversedPlayerAvatar>
                    <PlayerAvatar player={p.player} size="small" />
                  </ReversedPlayerAvatar>
                  {/* <Points>+{p.active ? mobGame.round + 1 : i + 1}</Points> */}
                  {!p.active && <RemovedPlayer src={removedCross} />}
                  {p.active && <WinningPlayer src={winCheck} />}
                </div>
              );
            })}
          </RoundPlayers>
        </RoundContainer>
      ))}
    </Container>
  );
}
