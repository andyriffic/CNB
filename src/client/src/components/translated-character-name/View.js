/* @flow */
import React from 'react';

const TRANSLATATIONS = {
  'NINJA': '忍者',
  'COWBOY': '牛仔',
  'BEAR': '熊',
}

const safeGetTranslation = (character) => {
  if (TRANSLATATIONS[character.toUpperCase()]) {
    return `${character} ${TRANSLATATIONS[character.toUpperCase()]}`;
  }

  return character;
}

const View = ( { character }) => {

  return (
    <React.Fragment>
      { safeGetTranslation(character) }
    </React.Fragment>
  )
}

export default View;
