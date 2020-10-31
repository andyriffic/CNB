import React from 'react';
import halloweenGhost from './halloween-ghost.gif';
import halloweenPumpkin from './halloween-jackolantern.gif';
import halloweenSpider from './halloween-spider.gif';
import thinkingCat from './thinking-cat.gif';

export const ThinkingCat = () => {
  return <img src={thinkingCat} style={{ width: '100%', height: '100%' }} />;
};

export const SpookyGhost = () => {
  return (
    <img
      src={halloweenGhost}
      style={{
        position: 'absolute',
        display: 'block',
        bottom: 0,
        left: '-20%',
      }}
    />
  );
};

export const SpookyPumpkin = () => {
  return (
    <img
      src={halloweenPumpkin}
      style={{
        position: 'absolute',
        display: 'block',
        bottom: '-10%',
        left: '25%',
      }}
    />
  );
};

export const SpookySpider = () => {
  return (
    <img
      src={halloweenSpider}
      style={{
        position: 'absolute',
        display: 'block',
        top: 0,
        right: '-20%',
      }}
    />
  );
};
