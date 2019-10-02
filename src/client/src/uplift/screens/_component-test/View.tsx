import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { TrophyProgressIndicator } from '../components/trophy-progress-indicator';
import { StampText } from '../../components/stamp-text';
import { ConfettiContext } from '../../contexts/ConfettiProvider';
import { ConfettiTrigger } from './ConfettiTrigger';
import { Timebomb } from '../matchup-view/components/Timebomb';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SoundService } from '../../../sounds/SoundService';

const ComponentContainer = styled.div``;

export default ({  }: RouteComponentProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);
  const [trophyPoints, setTrophyPoints] = useState(3);
  const [trophyProgressReverse, setTrophyProgressReverse] = useState(false);
  const { setConfettiOn } = useContext(ConfettiContext);

  const [stampText, setStampText] = useState('Winner!');
  const [showStampText, setShowStampText] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const [bombExploded, setBombExploded] = useState(false);
  const [bombTicking, setBombTicking] = useState(false);

  console.log(setConfettiOn);

  useEffect(() => {
    soundService.load();
  }, []);

  return (
    <PlayersProvider>
      <FullPageLayout pageTitle="Test components" alignTop={true}>
        <ComponentContainer>
          <ConfettiTrigger />
        </ComponentContainer>
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
        <ComponentContainer>
          <input
            type="checkbox"
            checked={bombExploded}
            onChange={e => setBombExploded(e.target.checked)}
          />
          <input
            type="checkbox"
            checked={bombTicking}
            onChange={e => setBombTicking(e.target.checked)}
          />

          <div
            style={{
              border: '1px solid black',
              position: 'relative',
              height: '30px',
            }}
          >
            <div style={{ position: 'absolute', bottom: '0', left: '50%' }}>
              <Timebomb
                exploded={bombExploded}
                ticking={bombTicking}
                onComplete={() => {
                  setBombTicking(false);
                  setBombExploded(false);
                }}
              />
            </div>
          </div>
        </ComponentContainer>
      </FullPageLayout>
    </PlayersProvider>
  );
};
