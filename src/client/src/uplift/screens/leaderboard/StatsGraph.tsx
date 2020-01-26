import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const BarSegment = styled.div<{ width: number }>`
  font-family: 'Changa One', cursive;
  width: ${props => props.width}%;
  height: 30px;
  line-height: 30px;
  font-size: 0.8rem;
  text-align: center;
  color: #fff;
`;

const WinSegment = styled(BarSegment)`
  background-color: #5cb85c;
  color: darkgreen;
`;
const DrawSegment = styled(BarSegment)`
  background-color: #e99d44;
  color: brown;
`;
const LossSegment = styled(BarSegment)`
  background-color: #df562c;
  color: darkred;
`;

type Props = {
  wins: number;
  draws: number;
  losses: number;
};

export const StatsGraph = ({ wins, draws, losses }: Props) => {
  const total = wins + draws + losses;
  return (
    <Container className="margins-off">
      <WinSegment width={(wins / total) * 100}>{wins}</WinSegment>
      <DrawSegment width={(draws / total) * 100}>{draws}</DrawSegment>
      <LossSegment width={(losses / total) * 100}>{losses}</LossSegment>
    </Container>
  );
};
