import React, { ReactNode } from 'react';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';

const Container = styled.div`
  margin: 30px 0 0 30px;
  position: relative;
  margin-bottom: 16px;
`;
const MedalCircle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  color: white;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;
  position: relative;
  border-width: 0.2em;
  border-style: solid;
  z-index: 1;

  // Default colors
  box-shadow: inset 0 0 0
      ${tinyColor('d1d7da')
        .darken(15)
        .toString()},
    2px 2px 0 rgba(0, 0, 0, 0.08);
  border-color: ${tinyColor('#d1d7da')
    .lighten(10)
    .toString()};
  text-shadow: 2px 2px 0
    ${tinyColor('#d1d7da')
      .darken(20)
      .toString()};
  background: linear-gradient(
    to bottom right,
    #d1d7da 50%,
    ${tinyColor('#d1d7da')
        .darken(5)
        .toString()}
      50%
  );
`;

const Ribbon = styled.div`
  content: '';
  display: block;
  position: absolute;
  border-style: solid;
  border-width: 10px 14px;
  width: 0;
  height: 40px;
  top: 76px;
`;

const RibbonLeft = styled(Ribbon)`
  border-color: #4863a0 #4863a0 transparent #4863a0;
  left: 18px;
  transform: rotate(20deg) translateZ(-32px);
`;

const RibbonRight = styled(Ribbon)`
  left: 38px;
  border-color: ${tinyColor('#4863A0')
      .darken(10)
      .toString()}
    ${tinyColor('#4863A0')
      .darken(10)
      .toString()}
    transparent
    ${tinyColor('#4863A0')
      .darken(10)
      .toString()};
  transform: rotate(-20deg) translateZ(-48px);
`;

type Props = {
  children: ReactNode;
};

export const Medal = ({ children }: Props) => {
  return (
    <Container className="margins-off">
      <MedalCircle>
        <span>{children}</span>
      </MedalCircle>
      <RibbonLeft />
      <RibbonRight />
    </Container>
  );
};
