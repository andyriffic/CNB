import React from 'react';
import styled from 'styled-components';

type Props = {
  showIndex?: number;
  children: React.ReactNodeArray;
};

export const TransitionView = ({ showIndex = 0, children }: Props) => {
  return <>{children.map((child, index) => index === showIndex && child)}</>;
};
