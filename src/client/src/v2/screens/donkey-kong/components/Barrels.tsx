import React from 'react';
import { PositionedBarrel } from './PositionedBarrel';
import barrelImg from '../assets/barrel.png';
import explosionImg from '../assets/explosion.gif';
import {
  Barrel,
  BarrelState,
  throwSpeed,
  useBarrelProvider,
} from '../providers/BarrelProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import kongGif from '../assets/kong.gif';

const barrelDimension = 50;

export const Barrels = () => {
  const {
    barrels,
    addBarrel,
    createBarrels,
    throwBarrel,
    explodeBarrel,
    removeBarrel,
  } = useBarrelProvider();
  const { play } = useSoundProvider();

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

  const createAllBarrels = () => {
    const newBarrels = createBarrels();
    const delayedBarrels = newBarrels.map(b => (_barrels: Barrel[]) =>
      addBarrelWithTimeout(b, _barrels)
    );
    delayedBarrels.reduce(
      (p, delayedBarrel) => p.then(_barrels => delayedBarrel(_barrels)),
      Promise.resolve(barrels)
    );
  };

  const throwBarrelAndExplode = (barrel: Barrel) => {
    if (barrels.some(b => b.state === BarrelState.THROWING)) return;

    const throwingBarrel = throwBarrel(barrel);
    if (!throwingBarrel) return;
    play('DonkeyKongThrowBarrel');
    setTimeout(() => {
      play('DonkeyKongExplodeBarrel');
      const explodedBarrel = explodeBarrel(throwingBarrel);
      setTimeout(() => {
        removeBarrel(explodedBarrel);
      }, 1000);
    }, throwSpeed);
  };

  return (
    <div style={{ position: 'absolute', top: '0', left: '0' }}>
      <img
        onClick={createAllBarrels}
        src={kongGif}
        alt="Kong"
        style={{
          width: '130px',
          height: '130px',
          position: 'absolute',
          top: '7px',
          left: '130px',
        }}
      />

      {barrels.map(b => (
        <PositionedBarrel
          throwing={b.state === BarrelState.THROWING}
          key={b.id}
          position={b.coordinates}
        >
          <img
            onClick={() => throwBarrelAndExplode(b)}
            src={b.state === BarrelState.EXPLODED ? explosionImg : barrelImg}
            alt="barrel"
            style={{
              width: barrelDimension,
              height: barrelDimension,
              cursor: 'pointer',
            }}
          />
        </PositionedBarrel>
      ))}
    </div>
  );
};
