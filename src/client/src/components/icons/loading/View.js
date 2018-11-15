/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const TopLeft = keyframes`
  0%  { left: 15%; top:25%; }
  25% { left: 70%; top:25%; transform: rotate(90deg) }
  50% { left: 70%; top: 70%; transform: rotate(180deg) }
  75% { left: 15%; top: 70%; transform: rotate(270deg) }
  100%  { left: 15%; top: 25%; transform: rotate(360deg) }
`;

const TopRight = keyframes`
0% { left: 70%; top: 25%; }
25% { left: 70%; top: 70%; }
50% { left: 15%; top: 70%; }
75%  { left: 15%; top: 25%; }
100% { left: 70%; top: 25%; }
`;

const BottomLeft = keyframes`
0% { left: 70%; top: 70%; }
25% { left: 15%; top: 70%; transform: rotate(90deg) }
50%  { left: 15%; top: 25%; transform: rotate(180deg) }
75%  { left: 70%; top: 25%; transform: rotate(270deg) }
100% { left: 70%; top: 70%; transform: rotate(360deg) }
`;
const BottomRight = keyframes`
0% { left: 15%; top: 70%; }
25%   { left: 15%; top: 25%; }
50% { left: 70%; top: 25%; }
75% { left: 70%; top: 70%; }
100% { left: 15%; top: 70%; }
`;

const Container = styled.div`
  width:100%;
  height:100%;
  position: relative;
`;
const Loading = styled.div`
  width:100%;
  height:100%;
  margin-top:-25%;
`;
const Block = styled.div`
  width:15%;
  height:15%;
  position:absolute;

  &:nth-child(1) {
    animation: ${TopLeft} 3s infinite ${props=> props.animationDelay}s;
    background-color:#00aacf ;
  }


  &:nth-child(2) {
    animation: ${TopRight} 3s infinite ${props=> props.animationDelay}s;
    background-color:#f6c574 ;
  }

  &:nth-child(3) {
    animation: ${BottomLeft} 3s infinite ${props=> props.animationDelay}s;
    background-color:#fc5652 ;
  }

  &:nth-child(4) {
    animation: ${BottomRight} 3s infinite ${props=> props.animationDelay}s;
    background-color:#00b3a0 ;
  }

`;

const View = ( { animationDelay }) => {
  return (
    <Container>
      <Loading>
        <Block animationDelay={animationDelay}/>
        <Block animationDelay={animationDelay}/>
        <Block animationDelay={animationDelay}/>
        <Block animationDelay={animationDelay}/>
      </Loading>
    </Container>
  )
}

export default View;
