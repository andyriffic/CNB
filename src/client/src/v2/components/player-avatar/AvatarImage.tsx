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

const PlayerImage = styled.img`
  display: block;
`;

type Props = {
  imageUrl: string;
  size: keyof AvatarSizeStyles;
};

export const AvatarImage = ({ imageUrl, size }: Props) => {
  return <PlayerImage src={imageUrl} style={avatarSizeStyles[size]} />;
};
