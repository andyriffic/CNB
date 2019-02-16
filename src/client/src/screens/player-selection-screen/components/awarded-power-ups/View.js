import React, { useContext } from 'react';
import styled from 'styled-components';
import { media, PageSubTitle } from '../../../styled';
import PowerUpContext from '../../../../contexts/PowerUpContext';

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
