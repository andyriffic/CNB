import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import PlayerAvatar from '../../players/components/player-avatar';
import { PlayerSpectatorContainer, PlayerSpectatorSection } from '../styled';
import GameThemeContext from '../../contexts/GameThemeContext';

import { Power4 } from 'gsap/EasePack';
import { CSSPlugin, TimelineLite } from 'gsap/all';

const plugins = [CSSPlugin]; // eslint-disable-line no-unused-vars

const xianPlayers = [
  { name: 'Bin', imageName: 'bin' },
  { name: 'Shuming', imageName: 'shuming' },
  { name: 'Yingjian', imageName: 'yingjian' },
  { name: 'Yixing', imageName: 'yixing' },
  { name: 'Guest 1', imageName: 'pikachu' },
];
const melbPlayers = [
  { name: 'Andy', imageName: 'andy' },
  { name: 'Azra', imageName: 'azra' },
  { name: 'Chris', imageName: 'chris' },
  { name: 'Duyen', imageName: 'duyen' },
  { name: 'Jay', imageName: 'jay' },
  { name: 'Jim', imageName: 'jim' },
  { name: 'Liujing', imageName: 'liujing' },
  { name: 'Marion', imageName: 'marion' },
  { name: 'Michael B', imageName: 'michael_b' },
  { name: 'Michael W', imageName: 'michael_w' },
  { name: 'Stacey', imageName: 'stacey' },
  { name: 'Ray', imageName: 'ray' },
  { name: 'Guest 1', imageName: 'squirtle' },
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

  const [avatarXian, setAvatarXian] = useState(xianPlayers[0]);
  const [avatarMelb, setAvatarMelb] = useState(melbPlayers[0]);
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
            <select onChange={e => setAvatarXian(xianPlayers[e.target.value])}>
              {xianPlayers.map((avatar, index) => {
                return (
                  <option value={index} key={avatar.name}>
                    {avatar.name}
                  </option>
                );
              })}
            </select>
          </div>
          <PlayerContainer>
            <AvatarContainer>
              <PlayerAvatar avatar={avatarXian} />
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
            <select onChange={e => setAvatarMelb(melbPlayers[e.target.value])}>
              {melbPlayers.map((avatar, index) => {
                return (
                  <option value={index} key={avatar.name}>
                    {avatar.name}
                  </option>
                );
              })}
            </select>
          </div>
          <PlayerContainer>
            <AvatarContainer>
              <PlayerAvatar avatar={avatarMelb} />
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
