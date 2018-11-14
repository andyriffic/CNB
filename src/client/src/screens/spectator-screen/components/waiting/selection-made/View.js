/* @flow */
import React from 'react';
import styled from 'styled-components';

const Check = styled.div`
  align-self: center;
`

const View = () => {
  return (
    <Check dangerouslySetInnerHTML={{ __html: '&check;'}}></Check>
  );
}

export default View;
