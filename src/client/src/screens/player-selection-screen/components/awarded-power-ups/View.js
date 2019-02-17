import React from 'react';
import { PageSubTitle } from '../../../styled';

const View = ({ awardedPowerUps }) => {
  if (!(awardedPowerUps && awardedPowerUps.length)) {
    return null;
  }

  return (
    <React.Fragment>
      <PageSubTitle>You got 你得到了</PageSubTitle>
      {awardedPowerUps.map(powerUp => (
        <p>{powerUp}</p>
      ))}
    </React.Fragment>
  );
};

export default View;
