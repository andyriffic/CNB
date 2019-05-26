import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  margin: 0;
  color: white;
`;

const Date = styled.div`
  font-size: 0.4rem;
  margin: 0;
  padding: 0 0 10px 0;
  text-align: center;
  white-space: nowrap;
  opacity: 0.8;
`;

const Trophy = styled.div`
  font-size: 0.6rem;
  margin: 0;
  padding: 10px 0 0 0;
  text-align: center;
`;

const TeamName = styled.div`
  margin: 0;
  padding: 10px 20px;
  text-align: center;
  line-height: 1;
  background-color: ${props => props.style.bgColor};
  border-radius: 7px;
  opacity: ${props => props.style.opacity};
`;

const styles = {
  player1: {
    bgColor: '#D4BA6A',
    opacity: 1,
  },
  player2: {
    bgColor: '#D4886A',
    opacity: 1,
  },
  draw: {
    bgColor: '#496D89',
    opacity: 0.7,
  },
};
const mapTeamToName = {
  player1: 'XIAN',
  player2: 'MELB',
};

export const SubStatItem = ({ date, team, draw, trophy }) => {
  const momentDate = moment(date);
  const styleKey = draw ? 'draw' : team;
  const playerName = team ? mapTeamToName[team] : 'DRAW';
  return (
    <Container style={styles[styleKey]}>
      <Date>{momentDate.format('ddd DD MMM, h:mmA')}</Date>
      {/* <Time>{momentDate.format('h:mmA')}</Time> */}
      <TeamName style={styles[styleKey]}>{playerName}</TeamName>
      {trophy && <Trophy>🏆</Trophy>}
    </Container>
  );
};
