import React from 'react';
import { Button } from '../../../components/ui/buttons';
import { PositionedBarrel } from './PositionedBarrel';
import barrelImg from '../assets/barrel.png';
import explosionImg from '../assets/explosion.gif';
import {
  Barrel,
  BarrelState,
  throwSpeed,
  useBarrelProvider,
} from '../providers/BarrelProvider';

const barrelDimension = 50;

export const Barrels = () => {
  const {
    barrels,
    createBarrel,
    throwBarrel,
    explodeBarrel,
    removeBarrel,
  } = useBarrelProvider();

  const throwBarrelAndExplode = (barrel: Barrel) => {
    const throwingBarrel = throwBarrel(barrel);
    if (!throwingBarrel) return;
    setTimeout(() => {
      const explodedBarrel = explodeBarrel(throwingBarrel);
      setTimeout(() => {
        removeBarrel(explodedBarrel);
      }, 1000);
    }, throwSpeed);
  };

  return (
    <div style={{ position: 'absolute', top: '0', left: '0' }}>
      <Button onClick={createBarrel}>Create barrel</Button>
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
