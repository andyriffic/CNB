import React from 'react';
import styled from 'styled-components';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';

type TrophyProgressIndicatorProps = {
  goal: number;
  points: number;
  trophies: number;
  reverse?: boolean;
};

const Container = styled.div<{ reverse: boolean }>`
  padding: 30px 0;
  position: relative;
  ${props => props.reverse && 'transform: scaleX(-1);'}
`;

const TrophyShelf = styled.div`
  position: absolute;
  line-height: 1;
  top: 0;
`;

const TrophyShelfIcon = styled.span`
  font-size: 0.7rem;
`;

const ProgressBar = styled.div`
  border: 1px solid black;
  background-color: white;
  border-radius: 8px;
  height: 30px;
  width: 96%;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentComplete: number }>`
  width: ${props => props.percentComplete}%;
  height: 100%;
  background-color: steelblue;
  transition: width 800ms ease-in-out;
`;

const TrophyIcon = styled.div<{ complete: boolean }>`
  border: 1px solid black;
  background-color: ${props => (props.complete ? 'steelblue' : 'white')};
  transition: background-color 900ms ease-in;
  font-size: 1rem;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 20px;
`;

const createTrophyShelf = (trophies: number): React.ReactNode => {
  const trophyElements = [];
  for (let i = 0; i < trophies; i++) {
    trophyElements.push(<TrophyShelfIcon key={i}>🏆</TrophyShelfIcon>);
  }

  return trophyElements;
};

export default ({
  goal,
  points,
  trophies,
  reverse = false,
}: TrophyProgressIndicatorProps) => {
  const percentComplete = (points / goal) * 100;
  return (
    <Container className="margins-off" reverse={reverse}>
      <TrophyShelf className="margins-off">{createTrophyShelf(trophies)}</TrophyShelf>
      <ProgressBar>
        <ProgressFill percentComplete={percentComplete} />
      </ProgressBar>
      <TrophyIcon complete={points >= goal}>
        <span style={{ paddingTop: '5px' }}>🏆</span>
      </TrophyIcon>
    </Container>
  );
};
