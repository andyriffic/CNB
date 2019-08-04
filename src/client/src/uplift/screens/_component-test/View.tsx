import React, { useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { TrophyProgressIndicator } from '../components/trophy-progress-indicator';
import { StampText } from '../../components/stamp-text';

const ComponentContainer = styled.div``;

export default ({  }: RouteComponentProps) => {
  const [trophyPoints, setTrophyPoints] = useState(3);
  const [trophyProgressReverse, setTrophyProgressReverse] = useState(false);

  const [stampText, setStampText] = useState('Winner!');
  const [showStampText, setShowStampText] = useState(false);

  return (
    <PlayersProvider>
      <FullPageLayout pageTitle="Test components" alignTop={true}>
        <ComponentContainer>
          <h3>Trophy progress indicator</h3>
          <input
            type="number"
            value={trophyPoints}
            onChange={e => setTrophyPoints(parseInt(e.target.value))}
          />
          <input
            type="checkbox"
            checked={trophyProgressReverse}
            onChange={e => setTrophyProgressReverse(e.target.checked)}
          />

          <div style={{ width: '500px', border: '1px solid black' }}>
            <TrophyProgressIndicator
              goal={5}
              trophies={3}
              points={trophyPoints}
              reverse={trophyProgressReverse}
            />
          </div>
        </ComponentContainer>
        <ComponentContainer>
          <h3>Stamp Text</h3>
          <input
            type="checkbox"
            checked={showStampText}
            onChange={e => setShowStampText(e.target.checked)}
          />
          <StampText text={stampText} show={showStampText} />
        </ComponentContainer>
      </FullPageLayout>
    </PlayersProvider>
  );
};
