import React from 'react';
import styled, { CSSObject } from 'styled-components';

export type AvatarSizeStyles = {
  small: CSSObject;
  medium: CSSObject;
  large: CSSObject;
};

const avatarSizeStyles: AvatarSizeStyles = {
  small: { width: '50px', height: '75px' },
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
