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

const RankingScrollableContainer = styled.div`
  max-height: 65vh;
  overflow-y: scroll;
`;

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

const Link = styled.a`
  display: block;
  padding: 20px 0;
  text-decoration: none;
  color: inherit;
  font-size: 0.5em;
  text-align: center;
`;

// const getWinningPercentage = (timesPlayed, timesWon) => {
//   if (timesPlayed === 0) {
//     return 0;
//   }

//   return Math.floor((timesWon / timesPlayed) * 100);
// };

const View = () => {
  const [rankingList, setRankingList] = useState({ title: '', result: [] });
  const soundService = useContext(GameSoundContext);
  soundService.loadScoreboard();

  useEffect(() => {
    console.log('SOUND', soundService);
    soundService.play(SOUND_KEYS.SCOREBOARD_MUSIC);
    fetchRankings().then(rankings => {
      setRankingList(rankings);
    });
  }, []);

  return (
    <FullPage pageTitle="Leaderboard">
      <GameSettingsDrawer />
      <PageSubTitle>{rankingList.title}</PageSubTitle>
      <RankingScrollableContainer>
        <RankingTable>
          <RankingTableBody>
            {rankingList.result.map((ranking, index) => {
              const isFirst = index === 0;
              const firstEqual =
                ranking.times_won === rankingList.result[0].times_won;
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
                    {ranking.times_won}
                  </RankingTableCell>
                </RankingTableRow>
              );
            })}
          </RankingTableBody>
        </RankingTable>
      </RankingScrollableContainer>
      <Link href="/">Back to game</Link>
    </FullPage>
  );
};

export default View;
