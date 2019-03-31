import React, { useState } from 'react';
import styled from 'styled-components';
import { Swipeable } from 'react-swipeable';

const VisibilityContainer = styled.div`
  overflow: hidden;
  height: 100%;
`;

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  transform: translate3d(
    -${props => (props.selectedItem ? props.selectedItem * 80 : 0)}%,
    0,
    0
  );
  transition: transform 300ms ease-out;
  will-change: transform;
`;

const ItemContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 0 0 5%;
  flex: 0 0 auto;
  border: 1px solid red;
`;

const ItemItem = styled.div`
  height: 80%;
  border: 1px solid green;
`;

const ItemSelection = styled.div`
  height: 20%;
  width: 80%;
  margin: 0 auto;
  font-size: 0.7rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  text-align: center;
  line-height: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const View = ({ items, selectedItem = 0, onItemSelected }) => {
  const [focusItemIndex, setFocusItemIndex] = useState(selectedItem);
  return (
    <VisibilityContainer>
      <ItemsContainer selectedItem={focusItemIndex}>
        {items.map((Item, index) => {
          return (
            <ItemContainer
              key={index}
              onClick={() => {
                console.log('item-card-selection::itemFocus', index);
                setFocusItemIndex(index);
              }}
            >
              <Swipeable onSwipedLeft={() => console.log('You swiped left')}>
                <ItemItem>{Item}</ItemItem>
              </Swipeable>
              <ItemSelection
                onClick={() => {
                  console.log('item-card-selection::itemSelected', index);
                  onItemSelected(index);
                }}
              >
                Choose 选择
              </ItemSelection>
            </ItemContainer>
          );
        })}
      </ItemsContainer>
    </VisibilityContainer>
  );
};

export default View;
