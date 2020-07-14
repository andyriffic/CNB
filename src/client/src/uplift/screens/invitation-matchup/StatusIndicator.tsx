import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { featureFontFamily } from '../../components/layouts/FullPageScreenLayout';

export enum STATUS_TYPE {
  WAITING = 'waiting',
  READY = 'ready',
}

const readyBackgroundAnimation = keyframes`
  0% {background: #008000;}
  25%  {background: #00A000;}
  50%  {background: #00B800;}
  75%  {background: #00D000;}
  100% {background: #008000;}
`;

const waitingBackgroundAnimation = keyframes`
  0% {background: #000080;}
  25%  {background: #0000A0;}
  50%  {background: #0000B0;}
  75%  {background: #0000C8;}
  100% {background: #000080;}
`;

const Container = styled.div<{ status: STATUS_TYPE }>`
  font-family: ${featureFontFamily};
  border-radius: 8px;
  font-size: 1rem;
  ${props =>
    props.status === STATUS_TYPE.READY &&
    css`
      animation: ${readyBackgroundAnimation} 8s linear infinite;
    `}
  ${props =>
    props.status === STATUS_TYPE.WAITING &&
    css`
      animation: ${waitingBackgroundAnimation} 8s linear infinite;
    `}
`;

type Props = {
  status?: STATUS_TYPE;
  children: React.ReactNode;
};

export const StatusIndicator = ({
  status = STATUS_TYPE.WAITING,
  children,
}: Props) => {
  return <Container status={status}>{children}</Container>;
};
