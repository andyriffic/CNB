import React from 'react';
import styled from 'styled-components';

const Podium = styled.div<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  display: flex;
  flex-direction: column-reverse;
`;

const PodiumText = styled.div`
  /* border: 1px solid black; */
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  border-radius: 8px;
  background-color: white;
  color: black;
  padding: 8px;
  margin: 20px;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.small};
  text-align: center;
`;

export type PodiumPositionType = 1 | 2 | 3;

type PodiumStyles = {
  [key in PodiumPositionType]: { backgroundColor: string };
};

type Props = {
  position: PodiumPositionType;
};

const podiumStyles: PodiumStyles = {
  1: { backgroundColor: 'goldenrod' },
  2: { backgroundColor: 'silver' },
  3: { backgroundColor: 'chocolate' },
};

export function PodiumPosition({ position }: Props): JSX.Element {
  return (
    <Podium
      style={{ minHeight: `${(4 - position) * 70}px` }}
      bg={podiumStyles[position].backgroundColor}
    >
      <PodiumText>
        Beat all players
        <br /> in <strong>{position}</strong> round
        {position > 1 && 's'}
      </PodiumText>
    </Podium>
  );
}
