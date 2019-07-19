import React from 'react';
import RainbowText from '../../../../components/rainbow-text';

const View = ({ powerUp }) => {
  return (
    <RainbowText>
      {powerUp ? (
        <React.Fragment>
          You got a PowerUp!!
          <br />
          你得到了一個力量
        </React.Fragment>
      ) : (
        ''
      )}
    </RainbowText>
  );
};

export default View;
