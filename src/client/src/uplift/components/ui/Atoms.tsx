import React, { ReactNodeArray, ReactNode } from 'react';
import styled from 'styled-components';
import {
  primaryBackgroundColorHex,
  primaryBackgroundColorDarkHex,
  primaryTextColor_variant_2_Hex,
  primaryTextColorHex,
  primaryBackgroundColorLightHex,
  featureTextColorHex,
} from './styleguide';

export const FeatureText = styled.h1`
  font-family: 'Alfa Slab One', cursive;
  margin: 0;
  padding: 0;
  font-size: 3rem;
  text-align: center;
  color: ${primaryTextColorHex};
`;

export const SubHeading = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
  text-align: center;
  color: ${primaryTextColor_variant_2_Hex};
  font-family: 'Alfa Slab One', cursive;
`;

export const Panel = styled.section`
  background-color: ${primaryBackgroundColorDarkHex};
  padding: 20px;
  border-radius: 8px;
`;

type CenterContentProps = {
  children: React.ReactNode;
  horizontal?: boolean;
  vertical?: boolean;
};

const AlignContentWrapper = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid red;
  align-items: center;
`;
const AlignContent = styled.div``;

export const CenterContent = ({ children }: CenterContentProps) => {
  return (
    <AlignContentWrapper>
      <AlignContent>{children}</AlignContent>
    </AlignContentWrapper>
  );
};

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const SideBySide = ({ children }: { children: ReactNodeArray }) => {
  return <HorizontalContainer>{children}</HorizontalContainer>;
};

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 1.2em;
  }
`;

export const Stacked = ({ children }: { children: ReactNodeArray }) => {
  return <VerticalContainer>{children}</VerticalContainer>;
};

const HelpTextContainer = styled(Panel)`
  background-color: ${primaryBackgroundColorLightHex};
  text-align: center;
`;

export const HelpText = ({ children }: { children: ReactNode }) => {
  return <HelpTextContainer>{children}</HelpTextContainer>;
};

export const FeatureLinkText = styled.span`
  color: ${featureTextColorHex};
  font-family: 'Courier New', Courier, 'Lucida Sans Typewriter',
    'Lucida Typewriter', monospace;
  font-weight: bold;
`;
