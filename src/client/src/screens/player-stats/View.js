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
  grid-template-columns: 10% 90%;
  background-image: linear-gradient(-90deg, #231922, #10030f);
  color: #e2e9c0;
  border: 1px solid #10030f;
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
  padding: 14px 0 0 0;
  text-align: center;
  color: #fff;
  opacity: 0.8;
  font-size: 2rem;
`;

const RankingGroupPlayer = styled.div`
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

const RankingGroupComponent = ({ rankingGroup, place, ranking, setRef }) => {
  return (
    <RankingGroupContainer ranking={ranking} ref={setRef}>
      <RankingGroupPlace>{place}</RankingGroupPlace>
      <RankingGroupPlayer>
        {rankingGroup.map(ranking => {
          return <PlayerRanking key={ranking.player} playerRanking={ranking} />;
        })}
      </RankingGroupPlayer>
    </RankingGroupContainer>
  );
};

const placeIcons = ['🥇', '🥈', '🥉'];

const View = () => {
  const [rankingList, setRankingList] = useState([]);
  const boardGroupRefs = useRef([]);
  const rankingContanerRef = useRef(null);
  const soundService = useContext(GameSoundContext);
  soundService.loadScoreboard();

  useEffect(() => {
    soundService.play(SOUND_KEYS.SCOREBOARD_MUSIC);
    fetchRankings().then(rankings => {
      setRankingList(groupPlayerRankings(rankings.result));
    });
  }, []);

  useEffect(() => {
    if (boardGroupRefs.current.length === rankingList.length) {
      const parentRefRect = rankingContanerRef.current.getBoundingClientRect();
      console.log('PARENT', parentRefRect);
      boardGroupRefs.current.reverse().forEach((elem, index) => {
        const rect = elem.getBoundingClientRect();
        console.log('THIS', elem.getBoundingClientRect());
        new TimelineLite({ delay: index * 8 })
          .to(elem, 3, { opacity: 1, ease: Power3.easeOut })
          .from(elem, 2, {
            y: parentRefRect.top - rect.top,
            ease: Bounce.easeOut,
            delay: 2,
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
                place={placeIcons[index] || index + 1}
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
