import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import PlayerAvatar from '../../players/components/player-avatar';
import { PlayerSpectatorContainer, PlayerSpectatorSection } from '../styled';
import GameThemeContext from '../../contexts/GameThemeContext';

import { Power4 } from 'gsap/EasePack';
import { CSSPlugin, TimelineLite } from 'gsap/all';

const plugins = [CSSPlugin]; // eslint-disable-line no-unused-vars

const xianPlayers = ['bin', 'fanglin', 'yingjian', 'yixing'];
const melbPlayers = [
  'andy',
  'azra',
  'chris',
  'duyen',
  'jay',
  'jim',
  'liujing',
  'marion',
  'michael_b',
  'michael_w',
  'stacey',
  'ray',
];

const PlayerContainer = styled.div`
  position: relative;
`;

const AvatarContainer = styled.div``;

const MoveContainer = styled.div`
  position: absolute;
  width: 10vmin;
  height: 10vmin;
  opacity: 0;
  top: 10vmin;
  ${props => (props.isLeft ? 'right' : 'left')}: -10vmin;
`;

const View = () => {
  const theme = useContext(GameThemeContext);

  const [username1, setUsername1] = useState(xianPlayers[0]);
  const [username2, setUsername2] = useState(melbPlayers[0]);
  const [moveAnimationTimeline, setMoveAnimationTimeline] = useState(null);

  const Character1 = theme.characters.characterMapping.A;
  const Character2 = theme.characters.characterMapping.B;

  const move1Ref = useRef();
  const move2Ref = useRef();

  useEffect(() => {
    if (!moveAnimationTimeline && move1Ref.current && move2Ref.current) {
      setMoveAnimationTimeline(
        new TimelineLite().to([move1Ref.current, move2Ref.current], 2, {
          opacity: 1,
        })
      );
    }
  }, [move1Ref.current, move2Ref.current]);

  return (
    <FullPage pageTitle="Player test">
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection>
          <div>
            <select onChange={e => setUsername1(e.target.value)}>
              {xianPlayers.map(player => {
                return (
                  <option value={player} key={player}>
                    {player}
                  </option>
                );
              })}
            </select>
          </div>
          <PlayerContainer>
            <AvatarContainer>
              <PlayerAvatar username={username1} />
            </AvatarContainer>
            <MoveContainer isLeft ref={move1Ref}>
              <Character1 />
            </MoveContainer>
          </PlayerContainer>
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <p>VS</p>
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <div>
            <select onChange={e => setUsername2(e.target.value)}>
              {melbPlayers.map(player => {
                return (
                  <option value={player} key={player}>
                    {player}
                  </option>
                );
              })}
            </select>
          </div>
          <PlayerContainer>
            <AvatarContainer>
              <PlayerAvatar username={username2} />
            </AvatarContainer>
            <MoveContainer ref={move2Ref}>
              <Character2 />
            </MoveContainer>
          </PlayerContainer>
        </PlayerSpectatorSection>
      </PlayerSpectatorContainer>
    </FullPage>
  );
};

export default View;
