import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PageSubTitle } from '../../../styled';
import PowerUpBadge from '../../../../components/power-up-badges';

const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.2, 1.2, 1.2);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PowerUp = styled.div`
  display: flex;
  width: 75vmin;
  height: 75vmin;
  animation: ${pulse} 2s linear infinite forwards;
`;

const View = ({ awardedPowerUp, onClose }) => {
  if (!awardedPowerUp) {
    return null;
  }

  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  const close = () => {
    setShow(false);
    onClose();
  };

  return (
    <Container onClick={close}>
      <PageSubTitle centered>
        PowerUp awarded
        <br />
        通電獲獎
      </PageSubTitle>
      <PowerUp>
        <PowerUpBadge type={awardedPowerUp} bigText />
      </PowerUp>
    </Container>
  );
};

export default View;
