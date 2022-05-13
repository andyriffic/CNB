import React from 'react';
import styled, { CSSObject } from 'styled-components';

export type AvatarSizeStyles = {
  small: React.CSSProperties;
  smallMedium: React.CSSProperties;
  medium: React.CSSProperties;
  large: React.CSSProperties;
};

const avatarSizeStyles: AvatarSizeStyles = {
  small: { width: '50px', height: '75px' },
  smallMedium: { width: '10vw', height: '12.5vw' },
  medium: { width: '20vw', height: '25vw' },
  large: { width: '30vw', height: '40vw' },
};

const PlayerImage = styled.img<{ accentColor: string }>`
  display: block;
  /* filter: drop-shadow(5px 5px 0px ${({ accentColor }) => accentColor}); */
`;

type Props = {
  imageUrl: string;
  size: keyof AvatarSizeStyles;
  accentColor?: string;
};

export const AvatarImage = ({
  imageUrl,
  size,
  accentColor = '#000',
}: Props) => {
  return (
    <PlayerImage
      src={imageUrl}
      style={avatarSizeStyles[size]}
      accentColor={accentColor}
    />
  );
};
