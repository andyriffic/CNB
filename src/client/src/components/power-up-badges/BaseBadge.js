import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 60%;
  height: 60%;
  margin: auto auto;
  background: ${props => props.backgroundColor || '#cccccc'};
  transform: rotate(-45deg);
  position: relative;
  text-align: center;
  text-decoration: none;
  color: ${props => props.textColor || '#ffffff'};
  font-weight: bold;
  text-shadow: 0 0 20px #dfaf00, 0 0 8px #dfaf00;
  transition: transform 0.8s ease;

  &:hover {
    transform: rotate(315deg);
  }

  span {
    background: ${props => props.backgroundColor || '#ccc'};
  }
`;

const Spike = styled.span`
  display: ${props => (props.hasText ? 'flex' : 'block')};
  width: 100%;
  height: 100%;
  transform: rotate(22.5deg);
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  margin: auto auto;
  transform: rotate(-22deg);
  display: flex;
  flex-direction: column;
  font-size: ${props => (props.bigText ? '1.8' : '0.6')}rem;
`;

const Count = styled.span`
  font-size: 60%;
  display: block;
`;

const View = ({ text, backgroundColor, textColor, bigText, count }) => {
  return (
    <Container backgroundColor={backgroundColor} textColor={textColor}>
      <Spike>
        <Spike>
          <Spike hasText>
            <Text bigText={bigText}>{text}{count && count > 1 && <Count>{count}</Count>}</Text>
            
          </Spike>
        </Spike>
      </Spike>
    </Container>
  );
};

export default View;
