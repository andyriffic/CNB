import React, { useState } from 'react';
import styled from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import ItemSelection from '../../components/item-card-selection';

const items = [
  <p style={{ border: '2px solid #ccc' }}>Item 1</p>,
  <p style={{ border: '2px solid #ccc' }}>Item 2</p>,
  <p style={{ border: '2px solid #ccc' }}>Item 3</p>,
];

const Container = styled.div`
  margin: 0 auto;
  width: 30vw;
  height: 30vh;
  border: 2px solid white;
`;

const View = () => {
  return (
    <FullPage pageTitle="Item selection test">
      <Container>
        <ItemSelection
          items={items}
          onItemSelected={index => {
            console.log('YOU SELECTED: ', index);
          }}
        />
      </Container>
    </FullPage>
  );
};

export default View;
