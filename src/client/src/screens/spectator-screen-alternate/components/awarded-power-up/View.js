/* @flow */
import React from 'react';

type Props = {
  powerUp?: string,
};

const View = ({ powerUp }: Props) => {
  return (
    <React.Fragment>
      {powerUp ? (
        <React.Fragment>
          You got a PowerUp!!
          <br />
          你得到了一個力量
        </React.Fragment>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default View;
