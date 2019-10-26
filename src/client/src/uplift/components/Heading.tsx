import React, { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { pulseAnimation, rubberBandAnimation } from './animations';

const TextClipAnimation = keyframes`
  to {
      background-position: 200% center;
  }
`;

const StyleHeading1 = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  /* font-family: 'Rammetto One', cursive; */
  font-family: 'Creepster', cursive;
  color: #6ebe44;
  text-shadow: 0 0 20px #000, 0 0 8px #000;

  /* color: #fff; */
  /* text-transform: uppercase; */
  /* font-weight: 700; */
  /* background: linear-gradient(to right, #e72a3a 10%, #fff 50%, #5bdaff 60%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  animation: ${TextClipAnimation} 1.5s linear infinite;
  display: inline-block; */
`;

export const MainHeading = ({ children }: { children: React.ReactNode }) => {
  return <StyleHeading1>{children}</StyleHeading1>;
};
