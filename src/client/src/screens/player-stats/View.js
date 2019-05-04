import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import { PageSubTitle } from '../styled';
import { STATS_API_BASE_URL } from '../../environment';
import RainbowText from '../../components/rainbow-text';
import GameSoundContext from '../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../sounds/SoundService';
import { GameSettingsDrawer } from '../../game-settings';

const fetchRankings = () => {
  return fetch(`${STATS_API_BASE_URL}/players-by-points-ranking.json`, {
    cache: 'no-store',
  }).then(resp => {
    return resp.json();
  });
};

const RankingTable = styled.table`
  width: 90vw;
  max-width: 960px;
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
  const soundService = useContext(GameSoundContext);
  soundService.loadScoreboard();

  useEffect(() => {
    console.log('SOUND', soundService);
    soundService.play(SOUND_KEYS.SCOREBOARD_MUSIC);
    fetchRankings().then(rankings => {
      setRankingList(rankings.result);
    });
  }, []);

  return (
    <FullPage pageTitle="Leaderboard">
      <GameSettingsDrawer />
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
                  {featureRow ? '🥇' : `${index + 1}.`}
                </RankingTableCell>
                <RankingTableCell feature={featureRow}>
                  {featureRow ? (
                    <RainbowText>{ranking.player}</RainbowText>
                  ) : (
                    ranking.player
                  )}
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
