/* @flow */
import React from 'react';
import styled from 'styled-components';

const HourGlass = styled.div`
  align-self: center;
`

const View = () => {
  return (
    <HourGlass dangerouslySetInnerHTML={{ __html: '&#10710;'}}></HourGlass>
  );
}

export default View;
