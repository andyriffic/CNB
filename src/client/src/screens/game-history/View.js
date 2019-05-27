import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import { STATS_API_BASE_URL } from '../../environment';
import { GameSettingsDrawer } from '../../game-settings';
import { SubStatItem } from './SubStatItem';

const fetchRankings = () => {
  return fetch(`${STATS_API_BASE_URL}/game-result-history.json`, {
    cache: 'no-store',
  }).then(resp => {
    return resp.json();
  });
};

const ScrollableContainer = styled.div`
  max-height: 70vh;
`;

const RankingContainer = styled.div`
  width: 100vw;
  display: flex;
  overflow-x: auto;
  flex-direction: row-reverse;
  padding-bottom: 30px;

  &::after {
    content: ' ';
    padding-left: 1px;
  }
`;

const RankingItem = styled.div`
  padding: 10px;

  :first-child {
    margin-right: 35vw;
  }

  :last-child {
    margin-left: 50vw;
  }

  &:nth-child(odd) {
    background-color: rgba(30, 15, 28, 0.8);
  }

  &:nth-child(even) {
    background-color: rgba(30, 15, 28, 0.9);
  }
`;

const Link = styled.a`
  display: block;
  padding: 20px 0;
  text-decoration: none;
  color: inherit;
  font-size: 0.5em;
  text-align: center;
`;

const View = () => {
  const [rankingList, setRankingList] = useState({ title: '', result: [] });

  useEffect(() => {
    fetchRankings().then(rankings => {
      setRankingList(rankings);
    });
  }, []);

  return (
    <FullPage pageTitle="Leaderboard">
      <GameSettingsDrawer />
      <ScrollableContainer>
        <RankingContainer>
          {rankingList.result.map((ranking, index) => {
            return (
              <RankingItem key={index}>
                <SubStatItem
                  date={ranking.date}
                  team={ranking.winner}
                  draw={ranking.draw}
                  trophy={ranking.trophy}
                />
              </RankingItem>
            );
          })}
        </RankingContainer>
      </ScrollableContainer>
      <Link href="/">Back to game</Link>
    </FullPage>
  );
};

export default View;
