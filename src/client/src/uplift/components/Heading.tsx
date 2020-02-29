import React, { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { pulseAnimation, rubberBandAnimation } from './animations';
import { featureFontFamily } from './layouts/FullPageScreenLayout';

const TextClipAnimation = keyframes`
  to {
      background-position: 200% center;
  }
`;

export const slowRubberBandAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  15% {
    transform: scaleX(1.1) scaleY(0.9);
  }

  20% {
    transform: scaleX(0.9) scaleY(1.1);
  }

  30% {
    transform: scaleX(1.05) scaleY(0.95);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(1);
  }
`;

const StyleHeading1 = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  /* font-family: 'Rammetto One', cursive; */
  font-family: ${featureFontFamily};
  color: #3B4856;
  text-shadow: 0 0 20px #fff, 0 0 8px #000;
  animation: ${slowRubberBandAnimation} 8s ease-in-out 3s infinite;

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
