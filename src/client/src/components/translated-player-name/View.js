/* @flow */
import React from 'react';

const TRANSLATATIONS = {
  'XIAN': '西安',
  'MELB': '墨爾本',
}

export const safeGetTranslation = (playerName) => {
  if (TRANSLATATIONS[playerName]) {
    return `${playerName} ${TRANSLATATIONS[playerName]}`;
  }

  return playerName;
}

const View = ( { playerName }) => {

  return (
    <React.Fragment>
      { safeGetTranslation(playerName) }
    </React.Fragment>
  )
}

export default View;
