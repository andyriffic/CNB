import React, { useState } from 'react';
import styled from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import ItemSelection from '../../components/item-card-selection';

const items = [<p>Item 1</p>, <p>Item 2</p>, <p>Item 3</p>];

const Container = styled.div`
  margin: 0 auto;
  width: 30vw;
  height: 30vh;
  border: 2px solid white;
`;

const View = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return (
    <FullPage pageTitle="Item selection test">
      {items.map((item, index) => (
        <span
          style={{ padding: '5px', cursor: 'pointer' }}
          onClick={() => setSelectedItemIndex(index)}
        >
          {index}
        </span>
      ))}
      <Container>
        <ItemSelection
          items={items}
          selectedItemIndex={selectedItemIndex}
          onItemSelected={index => setSelectedItemIndex(index)}
        />
      </Container>
    </FullPage>
  );
};

export default View;
