import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import { PlayerSpectatorContainer, PageSubTitle } from '../styled';

const fetchRankings = () => {
  return fetch(
    'https://s3-ap-southeast-2.amazonaws.com/cnb-stats-dev/results/players-by-points-ranking.json',
    { cache: 'no-store' }
  ).then(resp => {
    console.log('RESPONSE', resp);
    return resp.json();
  });
};

const RankingTable = styled.table`
  width: 90vw;
  margin: 0 auto;
  border: 0;
  border-collapse: collapse;
  font-size: 0.6rem;
`;

const RankingTableBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: #ccc;
  }
`;

const RankingTableRow = styled.tr`
  margin: 0;
`;

const RankingTableCell = styled.td`
  margin: 0;
  padding: 10px;
  opacity: 0.8;
  ${props =>
    props.feature && 'font-size: 1.2rem; font-weight: bold; opacity: 1;'}
`;

const View = () => {
  const [rankingList, setRankingList] = useState([]);

  useEffect(() => {
    fetchRankings().then(rankings => {
      setRankingList(rankings.result);
    });
  }, []);

  return (
    <FullPage pageTitle="Leaderboard">
      <PageSubTitle>Ranking by Total Points Won</PageSubTitle>
      <RankingTable>
        <RankingTableBody>
          {rankingList.map((ranking, index) => {
            const isFirst = index === 0;
            const firstEqual = ranking.points === rankingList[0].points;
            const featureRow = isFirst || firstEqual;
            return (
              <RankingTableRow key={ranking.player}>
                <RankingTableCell
                  feature={featureRow}
                  style={{ textAlign: 'center' }}
                >
                  {featureRow ? 1 : index + 1}.
                </RankingTableCell>
                <RankingTableCell feature={featureRow}>
                  {ranking.player}
                </RankingTableCell>
                <RankingTableCell
                  feature={featureRow}
                  style={{ textAlign: 'center' }}
                >
                  {ranking.points}
                </RankingTableCell>
              </RankingTableRow>
            );
          })}
        </RankingTableBody>
      </RankingTable>
    </FullPage>
  );
};

export default View;
