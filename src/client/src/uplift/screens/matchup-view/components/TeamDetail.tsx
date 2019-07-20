import React from 'react';
import styled from 'styled-components';
import { Team } from '../../../contexts/MatchupProvider';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';

const Container = styled.div`
  border: 2px solid black;
  border-radius: 8px 8px 0 0;
`;

const TeamName = styled.h4`
  margin: 0;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: ${props => props.theme.headerBackgroundColor};
`;

const TeamPoints = styled.div`
  margin: 0;
  font-size: 2rem;
  text-align: center;
  background-color: #f5f5f5;
`;

export const TeamDetail = ({ team }: { team: Team }) => {
  return (
    <Container>
      <TeamName>{team.name}</TeamName>
      <TeamPoints>
        <ReadableNumberFont>{team.points}</ReadableNumberFont>
      </TeamPoints>
    </Container>
  );
};
