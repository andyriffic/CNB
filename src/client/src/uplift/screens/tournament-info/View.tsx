import React, { useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';
import tournamentLadderSample from './tournament-ladder-sample.png';

const MatchupsContainer = styled.div`
  width: 95%;
  height: 90vh;
  padding: 0 20px 50px 0;
  margin: 0 auto;
  overflow-y: scroll;
`;

export default ({  }: RouteComponentProps) => {
  return (
    <FullPageLayout pageTitle="Tournament Information" alignTop={true}>
      <MatchupsContainer>
        <ol>
          <li>
            Register players
            <ul>
              <li>Must have a SuperSquad picture</li>
              <li>There WILL be special guest players</li>
            </ul>
          </li>
          <li>Players randomly grouped into teams of 二 (2)</li>
          <li>Each team to choose a team name</li>
          <li>
            All teams randomly assigned starting matchup on a tournament ladder <br />{' '}
            <img src={tournamentLadderSample} />
          </li>
          <li>
            Each day we play one matchup to get a winner
            <ul>
              <li>First to 三 (3) points wins the matchup</li>
              <li>Each person in the team has to play at least once</li>
              <li>No bonus points</li>
              <li>No powerups</li>
            </ul>
          </li>
          <li>Grand final will be first to 五 (5) points</li>
          <li>
            Winner of the Grand Final will receive the respect and admiration of
            their peers (i.e. nothing)
          </li>
          <li>This will happen...soon</li>
        </ol>
      </MatchupsContainer>
    </FullPageLayout>
  );
};
