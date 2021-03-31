import React, { useEffect, useRef } from 'react';
import { PositionedBarrel } from './PositionedBarrel';
import barrelImg from '../assets/barrel.png';
import explosionImg from '../assets/explosion.gif';
import {
  Barrel,
  BarrelState,
  ThrowBarrelResult,
  throwSpeed,
  useBarrelProvider,
} from '../providers/BarrelProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import kongGif from '../assets/kong.gif';
import {
  GameBoardPlayer,
  useGameBoardProvider,
} from '../providers/GameBoardProvider';

const barrelDimension = 50;

type Props = {
  autoCreateBarrels: boolean;
  autoThrowBarrels: boolean;
  onBarrelsCreated: () => void;
  onBarrelsThrown: () => void;
};

export const Barrels = ({
  autoCreateBarrels,
  autoThrowBarrels,
  onBarrelsCreated,
  onBarrelsThrown,
}: Props) => {
  const {
    barrels,
    addBarrel,
    createBarrels,
    throwBarrel,
    explodeBarrel,
    removeBarrel,
  } = useBarrelProvider();
  const { gameBoardPlayers, savePlayer } = useGameBoardProvider();

  const { play } = useSoundProvider();
  const createdBarrels = useRef(false);
  const thrownBarrels = useRef(false);

  const createAllBarrels = () => {
    const newBarrels = createBarrels();
    const delayedBarrels = newBarrels.map(b => (_barrels: Barrel[]) =>
      addBarrelWithTimeout(b, _barrels)
    );
    delayedBarrels
      .reduce(
        (p, delayedBarrel) => p.then(_barrels => delayedBarrel(_barrels)),
        Promise.resolve(barrels)
      )
      .then(() => setTimeout(() => onBarrelsCreated(), 1000));
  };

  const addBarrelWithTimeout = (
    barrel: Barrel,
    _barrels: Barrel[]
  ): Promise<Barrel[]> => {
    return new Promise<Barrel[]>(res => {
      if (_barrels.length === 0) {
        play('DonkeyKongCreateBarrel');
        res(addBarrel(barrel, _barrels));
      } else {
        setTimeout(() => {
          console.log('adding barrel', barrel, _barrels);
          play('DonkeyKongCreateBarrel');
          res(addBarrel(barrel, _barrels));
        }, 500);
      }
    });
  };

  const throwBarrelWithDelay = () => {
    const throwingBarrels = barrels.map(
      barrel => ({
        allBarrels,
        allPlayers,
      }: {
        allBarrels: Barrel[];
        allPlayers: GameBoardPlayer[];
      }) =>
        throwBarrelAndExplode({
          barrel,
          allBarrels,
          gameBoardPlayers: allPlayers,
        })
    );
    throwingBarrels
      .reduce(
        (p, throwing) =>
          p.then(({ allBarrels, allPlayers }) =>
            throwing({ allBarrels, allPlayers })
          ),
        Promise.resolve({ allBarrels: barrels, allPlayers: gameBoardPlayers })
      )
      .then(({ allPlayers }) => {
        setTimeout(() => {
          allPlayers.forEach(p => {
            savePlayer(p);
          });
        });
        setTimeout(() => onBarrelsThrown(), 1000);
      });
  };

  useEffect(() => {
    if (createdBarrels.current || !autoCreateBarrels) return;

    createdBarrels.current = true;
    createAllBarrels();
  }, [autoCreateBarrels]);

  useEffect(() => {
    if (thrownBarrels.current || !autoThrowBarrels) return;

    thrownBarrels.current = true;
    throwBarrelWithDelay();
  }, [autoThrowBarrels]);

  const throwBarrelAndExplode = (
    throwBarrelProps: ThrowBarrelResult
  ): Promise<{
    allBarrels: Barrel[];
    allPlayers: GameBoardPlayer[];
  }> => {
    return new Promise(res => {
      if (barrels.some(b => b.state === BarrelState.THROWING)) {
        res({
          allBarrels: throwBarrelProps.allBarrels,
          allPlayers: throwBarrelProps.gameBoardPlayers,
        });
        return;
      }

      const throwingBarrel = throwBarrel(throwBarrelProps);

      play('DonkeyKongThrowBarrel');
      setTimeout(() => {
        play('DonkeyKongExplodeBarrel');
        const explodedBarrel = explodeBarrel(throwingBarrel);
        setTimeout(() => {
          res({
            allPlayers: explodedBarrel.gameBoardPlayers,
            allBarrels: removeBarrel(
              explodedBarrel.barrel,
              explodedBarrel.allBarrels
            ),
          });
        }, 1000);
      }, throwSpeed);
    });
  };

  return (
    <div style={{ position: 'absolute', top: '0', left: '0' }}>
      <img
        src={kongGif}
        alt="Kong"
        style={{
          width: '130px',
          height: '130px',
          position: 'absolute',
          top: '7px',
          left: '40px',
        }}
      />

      {barrels.map(b => (
        <PositionedBarrel
          throwing={b.state === BarrelState.THROWING}
          key={b.id}
          position={b.coordinates}
        >
          <img
            src={b.state === BarrelState.EXPLODED ? explosionImg : barrelImg}
            alt="barrel"
            style={{
              width: barrelDimension,
              height: barrelDimension,
            }}
          />
        </PositionedBarrel>
      ))}
    </div>
  );
};
