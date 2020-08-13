import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { GameScreen } from '../../../v2/components/ui/GameScreen';
import { TransitionView } from '../../../v2/components/ui/TransitionView';
import {
  FeatureText,
  CenterContent,
  Panel,
  SideBySide,
  HelpText,
  FeatureLinkText,
  Stacked,
} from '../../../v2/components/ui/Atoms';
import { PlayersContext } from '../../contexts/PlayersProvider';
import { PlayerSelect } from '../../components/PlayerSelect';

enum ViewStates {
  One = 0,
  Two = 1,
}

export default ({  }: RouteComponentProps) => {
  const [viewIndex, setViewIndex] = useState(ViewStates.One);
  const { allPlayers } = useContext(PlayersContext);
  return (
    <GameScreen>
      <span onClick={() => setViewIndex(viewIndex - 1)}>Prev</span>
      <span onClick={() => setViewIndex(viewIndex + 1)}>Next</span>
      <TransitionView showIndex={viewIndex}>
        <>
          <FeatureText>One</FeatureText>
          {allPlayers && allPlayers.length > 0 && (
            <Stacked>
              <SideBySide>
                <PlayerSelect player={allPlayers[0]} />
                <PlayerSelect player={allPlayers[1]} />
              </SideBySide>
              <HelpText>
                Go to <FeatureLinkText>cnb.finx-rocks.com/play</FeatureLinkText>{' '}
                and select your player
              </HelpText>
            </Stacked>
          )}
        </>
        <FeatureText>Two</FeatureText>
      </TransitionView>
    </GameScreen>
  );
};
