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
import { AnimateFadeIn } from '../../components/animation/AnimateFadeIn';
import { AnimateSpin } from '../../components/animation/AnimateSpin';

const ComponentContainer = styled.div``;

const AnimationTestText = styled.div`
  font-size: 5rem;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
`;

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
  const [bombIntensity, setBombIntensity] = useState(1);

  const [animateFadeIn, setAnimateFadeIn] = useState(false);
  const [animateSpin, setAnimateSpin] = useState(false);

  useEffect(() => {
    soundService.load();
  }, []);

  return (
    <PlayersProvider>
      <FullPageLayout pageTitle="Test components" alignTop={true}>
        <ComponentContainer>
          <h3>Animations</h3>
          <input
            id="animate_fadein"
            type="checkbox"
            checked={animateFadeIn}
            onChange={e => setAnimateFadeIn(!animateFadeIn)}
          />
          <label htmlFor="animate_fadein">Fade In</label>
          <input
            id="animate_spin"
            type="checkbox"
            checked={animateSpin}
            onChange={e => setAnimateSpin(!animateSpin)}
          />
          <label htmlFor="animate_spin">Spin</label>

          <AnimateSpin play={animateSpin}>
            <AnimateFadeIn play={animateFadeIn}>
              <AnimationTestText>😎</AnimationTestText>
            </AnimateFadeIn>
          </AnimateSpin>
        </ComponentContainer>
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
          <input
            type="number"
            value={bombIntensity}
            onChange={e => setBombIntensity(parseInt(e.target.value))}
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
                intensity={bombIntensity}
                onComplete={() => {
                  if (!bombExploded) {
                    setBombTicking(false);
                    setBombExploded(false);
                  }
                }}
              />
            </div>
          </div>
        </ComponentContainer>
      </FullPageLayout>
    </PlayersProvider>
  );
};
