import React from 'react';
import styled from 'styled-components';

type PowerupStyleDef = {
  icon: string;
  name: string;
  bgColor1: string;
  bgColor2: string;
  color: string;
};

const powerupStyles: { [key: string]: PowerupStyleDef } = {
  DOUBLE_POINTS: {
    icon: '⚡️',
    name: 'Double Points',
    bgColor1: '#ffeb3b',
    bgColor2: '#fbc02d',
    color: '#ffb300',
  },
  POINT_STEALER: {
    icon: '😈',
    name: 'Point Stealer',
    bgColor1: '#ab47bc',
    bgColor2: '#4527a0',
    color: '#7127a8',
  },
  SHORT_FUSE: {
    icon: '💥',
    name: 'Short Fuse',
    bgColor1: '#f4511e',
    bgColor2: '#b71c1c',
    color: '#c62828',
  },
};

const Container = styled.div`
  font-size: 1rem;
`;

const Badge = styled.div<{ styleDef: PowerupStyleDef }>`
  position: relative;
  margin: 0.5em 1em;
  width: 65px;
  height: 100.75px;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  top: 0;
  transition: all 0.2s ease;
  &:before,
  &:after {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: inherit;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  &:before {
    transform: rotate(60deg);
  }
  &:after {
    transform: rotate(-60deg);
  }
  background: linear-gradient(
    to bottom right,
    ${props => props.styleDef.bgColor1} 0%,
    ${props => props.styleDef.bgColor2} 100%
  );
  color: ${props => props.styleDef.color};
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  background: #fff;
  z-index: 10;
  border-radius: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

const Icon = styled.i`
  font-size: 46px;
  display: block;
  font-style: normal;
`;

const Text = styled.div`
  display: inline-block;
  margin-top: 1em;
`;

const Ribbon = styled.div`
  position: absolute;
  border-radius: 4px;
  padding: 2px 5px 2px;
  width: 110px;
  z-index: 11;
  color: #fff;
  bottom: 5px;
  left: 50%;
  margin-left: -55px;
  /* height: 15px; */
  font-size: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.27);
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  background: linear-gradient(to bottom right, #555 0%, #333 100%);
  cursor: default;
`;

const Temp = styled.div`
  .badge {
    .circle {
    }
    .font {
    }
    .ribbon {
    }
  }
`;

type Props = {
  powerupName: string;
  total?: number;
};

export const PowerupBadge = ({ powerupName, total = 0 }: Props) => {
  const styleDef = powerupStyles[powerupName];
  if (!styleDef) {
    return null;
  }
  return (
    <Container>
      <Badge styleDef={styleDef}>
        <Circle>
          <Icon>{styleDef.icon}</Icon>
          {/* <Text>⚡️</Text> */}
        </Circle>
        <Ribbon>
          {styleDef.name}
          {total > 1 && ` ${total}`}
        </Ribbon>
      </Badge>
    </Container>
  );
};
