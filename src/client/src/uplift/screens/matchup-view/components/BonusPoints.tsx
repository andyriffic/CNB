import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DynamicUpdatingPoints } from '../../../components/dynamic-updating-points';

const Container = styled.div`
  font-size: 1.3rem;
  background-color: #ffbf00;
  border-radius: 8px;
  padding: 8px;
  color: #674d00;
  text-transform: uppercase;
  text-align: center;
`;

const ContainerBadge = styled.div``;

type Props = {
  points: number;
  showUpdate: boolean;
};

export const BonusPoints = ({ points, showUpdate }: Props) => {
  const [displayedPoints, setDisplayedPoints] = useState(points);

  useEffect(() => {
    if (showUpdate) {
      setDisplayedPoints(points);
    }
  }, [showUpdate]);

  return (
    <Container>
      <div className="margins-off">
        <div
          style={{
            fontSize: '0.6rem',
          }}
        >
          Bonus Points:
        </div>
        <div>
          <DynamicUpdatingPoints
            value={displayedPoints}
            showPointDiff={showUpdate}
          />
        </div>
      </div>
    </Container>
  );
};
