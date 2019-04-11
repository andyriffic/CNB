import React, { useState } from 'react';
import styled from 'styled-components';
import FullPage from '../../components/page-layout/FullPage';
import ItemSelection from '../../components/item-card-selection';

const Item = styled.p`
  border: 2px solid black;
  background-color: ${props => (props.hasFocus ? 'green' : 'white')};
  text-align: center;
  padding: 10px;
  transition: background-color 1s ease-out;
`;

const items = [
  hasFocus => <Item hasFocus={hasFocus}>Item 1</Item>,
  hasFocus => <Item hasFocus={hasFocus}>Item 2</Item>,
  hasFocus => <Item hasFocus={hasFocus}>Item 3</Item>,
];

const Container = styled.div`
  margin: 0 auto;
  width: 30vw;
  height: 30vh;
  border: 2px solid white;
`;

const View = () => {
  const [focusItemIndex, setFocusItemIndex] = useState(0);
  return (
    <FullPage pageTitle="Item selection test">
      <div>Focus Item: {focusItemIndex}</div>
      <Container>
        <ItemSelection
          items={items}
          selectedItem={focusItemIndex}
          onItemSelected={index => {
            console.log('YOU SELECTED: ', index);
          }}
          onItemFocused={index => setFocusItemIndex(index)}
        />
      </Container>
    </FullPage>
  );
};

export default View;
