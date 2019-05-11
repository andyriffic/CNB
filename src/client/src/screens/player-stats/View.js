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

const RankingContainer = styled.div`
  width: 90vw;
  max-width: 960px;
  margin: 0 auto;
`;

const RankingItem = styled.div`
  display: grid;
  grid-template-columns: 25% 50% 25%;
  background-color: #ccc;
  border-radius: 7px;
  margin-bottom: 10px;
  align-items: center;
  opacity: 0.8;
  font-size: 0.8rem;
  ${props =>
    props.feature && 'font-size: 1.2rem; font-weight: bold; opacity: 1;'}
`;
const RankingPlace = styled.div``;
const RankingPlayerName = styled.div``;
const RankingScore = styled.div`
  justify-self: center;
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
        <RankingContainer>
          {rankingList.result.map((ranking, index) => {
            const isFirst = index === 0;
            const firstEqual =
              ranking.times_won === rankingList.result[0].times_won;
            const featureRow = isFirst || firstEqual;
            return (
              <RankingItem feature={featureRow} key={ranking.player}>
                <RankingPlace
                  feature={featureRow}
                  style={{ textAlign: 'center' }}
                >
                  {featureRow ? '🥇' : `${index + 1}.`}
                </RankingPlace>
                <RankingPlayerName feature={featureRow}>
                  {featureRow ? (
                    <RainbowText>{ranking.player}</RainbowText>
                  ) : (
                    ranking.player
                  )}
                </RankingPlayerName>
                <RankingScore feature={featureRow}>
                  {ranking.times_won}
                </RankingScore>
              </RankingItem>
            );
          })}
        </RankingContainer>
      </RankingScrollableContainer>
      <Link href="/">Back to game</Link>
    </FullPage>
  );
};

export default View;
