import React from 'react';
import styled, { css } from 'styled-components';
import { fadeInAnimation } from '../../../../uplift/components/animations';
import { MobGame } from '../../../providers/MobProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import removedCross from './assets/removed-cross.png';
import winCheck from './assets/win-check.png';
import { PlayerAvatarLookup } from './PlayerAvatarLookup';
import { Points } from './Points';

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 20px;
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

const PointsContainer = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  mobGame: MobGame;
  winner?: 'mob' | 'mug';
};

export function MobResultSummary({ mobGame }: Props): JSX.Element {
  const { play } = useSoundProvider();

  const mugWon = mobGame.mugPlayer.lives > 0;

  const playersPerRound = [...Array(mobGame.round)].map((_, roundNumber) => {
    return mobGame.mobPlayers.filter(
      mp => mp.lastRound === roundNumber + 1 && !mp.active
    );
  });

  const roundChampions = mobGame.mobPlayers.filter(mp => mp.active);

  return (
    <Container>
      {playersPerRound.map((roundPlayers, i) => (
        <RoundContainer key={i}>
          <RoundLabel>Round {i + 1}</RoundLabel>
          <RoundPlayers>
            {roundPlayers.map(p => {
              const playerPoints = mobGame.points.mobPlayers.find(
                pp => pp.playerId === p.playerId
              );
              return (
                <div key={p.playerId} style={{ position: 'relative' }}>
                  <ReversedPlayerAvatar>
                    <PlayerAvatarLookup playerId={p.playerId} size="small" />
                  </ReversedPlayerAvatar>
                  {playerPoints && (
                    <PointsContainer>
                      <Points points={playerPoints.points} />
                    </PointsContainer>
                  )}
                  <RemovedPlayer src={removedCross} />
                </div>
              );
            })}
          </RoundPlayers>
        </RoundContainer>
      ))}
      {roundChampions.length > 0 && (
        <RoundContainer>
          <RoundLabel>Winners</RoundLabel>
          <RoundPlayers>
            {roundChampions.map(p => {
              const playerPoints = mobGame.points.mobPlayers.find(
                pp => pp.playerId === p.playerId
              );
              return (
                <div key={p.playerId} style={{ position: 'relative' }}>
                  <ReversedPlayerAvatar>
                    <PlayerAvatarLookup playerId={p.playerId} size="small" />
                  </ReversedPlayerAvatar>
                  {playerPoints && (
                    <PointsContainer>
                      <Points points={playerPoints.points} />
                    </PointsContainer>
                  )}
                  <WinningPlayer src={winCheck} />
                </div>
              );
            })}
          </RoundPlayers>
        </RoundContainer>
      )}
    </Container>
  );
}
