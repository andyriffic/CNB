import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReadableNumberFont } from '../../../components/ReadableNumberFont';
import { pulseAnimation } from '../animations';

type DynamicUpdatingPointsProps = {
  value: number;
};

const Container = styled.span`
  position: relative;
  display: inline-block;
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 0;
  right: -180%;
  font-size: 1.1rem;
  background: #228b22;
  border-radius: 50%;
  color: #fff;
  padding: 10% 20%;
  border: 3px solid #fff;
  text-align: center;
  display: inline-block;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  animation: ${pulseAnimation} 1.5s infinite;
`;

export default ({ value }: DynamicUpdatingPointsProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [pointsDifference, setPointsDifference] = useState<number>();

  useEffect(() => {
    if (value !== displayValue) {
      setDisplayValue(value);
      setPointsDifference(value - displayValue);
    }
  }, [value]);

  return (
    <Container className="margins-off">
      <ReadableNumberFont>{value}</ReadableNumberFont>
      {pointsDifference && (
        <BadgeContainer>
          <ReadableNumberFont>+{pointsDifference}</ReadableNumberFont>
        </BadgeContainer>
      )}
    </Container>
  );
};
