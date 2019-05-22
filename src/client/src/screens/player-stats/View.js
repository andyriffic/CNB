import React, { useEffect, useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import { STATS_API_BASE_URL } from '../../environment';
import RainbowText from '../../components/rainbow-text';
import GameSoundContext from '../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../sounds/SoundService';
import { GameSettingsDrawer } from '../../game-settings';
import { SubStatItem } from './SubStatItem';
import { ReadableNumberFont } from '../../components/ReadableNumberFont';

const fetchRankings = () => {
  return fetch(`${STATS_API_BASE_URL}/players-by-points-ranking.json`, {
    cache: 'no-store',
  }).then(resp => {
    return resp.json();
  });
};

const RankingItemEnterAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const RankingScrollableContainer = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
`;

const RankingContainer = styled.div`
  width: 90vw;
  max-width: 960px;
  margin: 0 auto;
`;

const RankingItem = styled.div`
  display: grid;
  grid-template-columns: 25% 40% 35%;
  background-color: rgba(30, 15, 28, 0.8);
  border-radius: 7px;
  margin-bottom: 10px;
  align-items: center;
  padding: 5px 0;
  font-size: 0.7rem;
  animation: ${RankingItemEnterAnimation} 1s ease-in
    ${props => (props.position > 8 ? 0 : 8 - props.position) * 700}ms 1 both;
  ${props =>
    props.feature &&
    'font-size: 1.2rem; font-weight: bold; background-color: rgba(30,15,28, 1);'}
`;
const RankingPlace = styled.div`
  color: #fff;
  opacity: 0.8;
  ${props => props.feature && 'opacity: 1;'}
`;

const RankingPlayerName = styled.div`
  color: #e2e9c0;
  opacity: 0.8;
  ${props => props.feature && 'opacity: 1;'}
`;

const RankingBreakdown = styled.div`
  display: flex;
  justify-content: space-evenly;
  opacity: 0.8;
  transition: opacity 500ms ease-in-out;

  ${RankingItem}:hover & {
    opacity: 1;
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
  const soundService = useContext(GameSoundContext);
  soundService.loadScoreboard();

  useEffect(() => {
    soundService.play(SOUND_KEYS.SCOREBOARD_MUSIC);
    fetchRankings().then(rankings => {
      setRankingList(rankings);
    });
  }, []);

  return (
    <FullPage pageTitle="Leaderboard">
      <GameSettingsDrawer />
      <RankingScrollableContainer>
        <RankingContainer>
          {rankingList.result.map((ranking, index) => {
            if (ranking.player === 'Guest') {
              // TODO: filter guest out on server
              return null;
            }
            const isFirst = index === 0;
            const firstEqual =
              ranking.times_won === rankingList.result[0].times_won;
            const featureRow = isFirst || firstEqual;
            return (
              <RankingItem
                feature={featureRow}
                key={ranking.player}
                totalRankings={rankingList.result.length}
                position={index}
              >
                <RankingPlace
                  feature={featureRow}
                  style={{ textAlign: 'center' }}
                >
                  {featureRow ? (
                    '🥇'
                  ) : (
                    <ReadableNumberFont>{index + 1}.</ReadableNumberFont>
                  )}
                </RankingPlace>
                <RankingPlayerName feature={featureRow}>
                  {featureRow ? (
                    <RainbowText>{ranking.player}</RainbowText>
                  ) : (
                    ranking.player
                  )}
                </RankingPlayerName>
                <RankingBreakdown>
                  <SubStatItem title="Wins" value={ranking.times_won} />
                  <SubStatItem
                    type="losses"
                    title="Losses"
                    value={ranking.times_lost}
                  />
                  <SubStatItem
                    type="draws"
                    title="Draws"
                    value={ranking.times_drawn}
                  />
                </RankingBreakdown>
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
