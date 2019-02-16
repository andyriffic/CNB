import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 60%;
  height: 60%;
  margin: auto auto;
  background: ${props => props.backgroundColor || '#ccc'};
  transform: rotate(-45deg);
  position: relative;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
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
  font-size: 1.4rem;
`;

const View = ({ text, backgroundColor, textColor }) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Spike>
        <Spike>
          <Spike hasText>
            <Text>{text}</Text>
          </Spike>
        </Spike>
      </Spike>
    </Container>
  );
};

export default View;
