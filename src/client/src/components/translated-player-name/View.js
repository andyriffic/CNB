/* @flow */
import React from 'react';

const TRANSLATATIONS: { [string]: string } = {
  XIAN: '西安',
  MELB: '墨爾本',
};

export const safeGetTranslation = (playerName: string): string => {
  if (TRANSLATATIONS[playerName]) {
    return `${playerName} ${TRANSLATATIONS[playerName]}`;
  }

  return playerName;
};

type Props = {
  playerName: string,
};

const View = ({ playerName }: Props) => {
  return <React.Fragment>{safeGetTranslation(playerName)}</React.Fragment>;
};

export default View;
