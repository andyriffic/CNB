import React, { useEffect, useState, useContext, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import { STATS_API_BASE_URL } from '../../environment';
import GameSoundContext from '../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../sounds/SoundService';
import { GameSettingsDrawer } from '../../game-settings';
import { PlayerRanking } from './PlayerRanking';
import { groupPlayerRankings } from './groupPlayerRankings';

import { Bounce, Power3 } from 'gsap/EasePack';
import { CSSPlugin, TimelineLite } from 'gsap/all';
import { rankByTotalWins, rankByWinsDrawsOverLosses } from './rankPlayers';
import { isFeatureEnabled } from '../../featureToggle';
const plugins = [CSSPlugin]; // eslint-disable-line no-unused-vars

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

const RankingGroupContainer = styled.div`
  opacity: 0;
  display: grid;
  align-items: center;
  padding: 10px 5px;
  grid-template-columns: 100fr;
  background-image: linear-gradient(90deg, #10030f 15%, ${props =>
    props.bgColor});
  color: #e2e9c0;
  border: 2px solid #10030f;
  border-radius: 7px;
  margin-bottom: 10px;
  font-size: 0.8rem;
  /* opacity: ${props => (props.ranking > 2 ? 1 : 0)};
  animation: ${RankingItemEnterAnimation} 1s ease-in
    ${props =>
      (props.ranking > 3 ? 0 : 3 - props.ranking) * 2000}ms 1 forwards; */
`;

const RankingGroupPlace = styled.h3`
  margin: 0;
  padding: 0;
  text-align: center;
  color: #fff;
  opacity: 0.8;
  font-size: 2rem;
`;

const RankingGroupPlayer = styled.div`
  width: 80%;
  margin: 0 auto;
  > div {
    border-bottom: 2px solid #10030f;
    padding: 10px 0;
  }

  > div:last-child {
    border-bottom: 0;
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

const placeIcons = ['🥇', '🥈', '🥉'];
const placeBackgroundColor = ['#AF9500', '#B4B4B4', '#6A3805'];

const rankingFunction = isFeatureEnabled('ranking')
  ? rankByWinsDrawsOverLosses
  : rankByTotalWins;

const RankingGroupComponent = ({ rankingGroup, ranking, setRef }) => {
  const place = placeIcons[ranking] || `${ranking + 1}th`;
  const bgColor = placeBackgroundColor[ranking] || '#231922';

  return (
    <RankingGroupContainer ranking={ranking} bgColor={bgColor} ref={setRef}>
      <RankingGroupPlace>{place}</RankingGroupPlace>
      <RankingGroupPlayer>
        {rankingGroup.map(ranking => {
          return <PlayerRanking key={ranking.player} playerRanking={ranking} />;
        })}
      </RankingGroupPlayer>
    </RankingGroupContainer>
  );
};

const View = () => {
  const [rankingList, setRankingList] = useState([]);
  const boardGroupRefs = useRef([]);
  const rankingContanerRef = useRef(null);
  const soundService = useContext(GameSoundContext);
  soundService.loadScoreboard();

  useEffect(() => {
    soundService.play(SOUND_KEYS.SCOREBOARD_MUSIC);
    fetchRankings().then(rankings => {
      setRankingList(groupPlayerRankings(rankingFunction(rankings.result)));
    });
  }, []);

  useEffect(() => {
    if (boardGroupRefs.current.length === rankingList.length) {
      const parentRefRect = rankingContanerRef.current.getBoundingClientRect();
      console.log('PARENT', parentRefRect);
      boardGroupRefs.current.reverse().forEach((elem, index) => {
        if (index < boardGroupRefs.current.length - 3) {
          new TimelineLite().to(elem, 0, { opacity: 1, ease: Power3.easeOut });
          return;
        }
        const rect = elem.getBoundingClientRect();
        // console.log('THIS', elem.getBoundingClientRect());
        new TimelineLite({
          delay: (index - (boardGroupRefs.current.length - 3)) * 3,
        })
          .to(elem, 0.5, { opacity: 1, ease: Power3.easeOut })
          .from(elem, 1, {
            y: parentRefRect.top - rect.top,
            ease: Bounce.easeOut,
            delay: 0.5,
          });
      });
    }
  });

  return (
    <FullPage pageTitle="Leaderboard">
      <GameSettingsDrawer />
      <RankingScrollableContainer>
        <RankingContainer ref={rankingContanerRef}>
          {rankingList.map((rankingGroup, index) => {
            return (
              <RankingGroupComponent
                setRef={r => (boardGroupRefs.current[index] = r)}
                key={index}
                rankingGroup={rankingGroup}
                ranking={index}
              />
            );
          })}
        </RankingContainer>
      </RankingScrollableContainer>
      <Link href="/">Back to game</Link>
    </FullPage>
  );
};

export default View;
