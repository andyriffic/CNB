import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? '1' : '0')};
  transition: opacity 1s ease-in;
`;

const View = ({ visible = false, children }) => {
  return <Container visible={visible}>{children}</Container>;
};

export default View;
