import React, { useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { TrophyProgressIndicator } from '../components/trophy-progress-indicator';

export default ({  }: RouteComponentProps) => {
  const [trophyPoints, setTrophyPoints] = useState(3);
  const [trophyProgressReverse, setTrophyProgressReverse] = useState(false);

  return (
    <PlayersProvider>
      <FullPageLayout pageTitle="Test components" alignTop={true}>
        <p>Trophy progress indicator</p>
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
            points={trophyPoints}
            reverse={trophyProgressReverse}
          />
        </div>
      </FullPageLayout>
    </PlayersProvider>
  );
};
