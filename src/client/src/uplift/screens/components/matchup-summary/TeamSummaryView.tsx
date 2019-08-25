import React from 'react';
import styled from 'styled-components';
import { Team } from '../../../contexts/MatchupProvider';

const Container = styled.div`
  flex: 1;
  text-align: center;
  align-self: flex-start;
`;

const TeamName = styled.h4`
  flex: 1;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  text-align: center;
  color: #e76d89;
`;

const PlayerList = styled.ul`
  margin: 0;
  padding: 0;
`;

const PlayerItem = styled.li`
  list-style-type: none;
  text-indent: 0;
  font-size: 0.6rem;
  margin: 0;
  padding: 0;
`;

export const TeamSummaryView = ({ team }: { team: Team }) => {
  return (
    <Container className="margins-off">
      <TeamName>{team.name}</TeamName>
      <PlayerList>
        {team.playerNames.map(name => (
          <PlayerItem key={name}>{name}</PlayerItem>
        ))}
      </PlayerList>
    </Container>
  );
};
