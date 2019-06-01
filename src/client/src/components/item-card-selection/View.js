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
`;

const ItemItem = styled.div`
  height: 80%;
`;

const View = ({
  items = [],
  selectedItem = 0,
  onItemSelected,
  onItemFocused,
}) => {
  const [focusItemIndex, setFocusItemIndex] = useState(selectedItem);

  const setItemFocus = index => {
    setFocusItemIndex(index);
    onItemFocused && onItemFocused(index);
  };

  return (
    <VisibilityContainer>
      <ItemsContainer selectedItem={focusItemIndex}>
        {items.map((item, index) => {
          const isFocused = index === focusItemIndex;
          return (
            <ItemContainer
              key={index}
              onClick={() => {
                console.log('item-card-selection::itemFocus', index);
                setItemFocus(index);
              }}
            >
              <Swipeable
                onSwipedLeft={() =>
                  setItemFocus(Math.min(focusItemIndex + 1, items.length - 1))
                }
                onSwipedRight={() =>
                  setItemFocus(Math.max(focusItemIndex - 1, 0))
                }
                onSwipedUp={() => onItemSelected(index)}
              >
                <ItemItem>{item(isFocused)}</ItemItem>
              </Swipeable>
            </ItemContainer>
          );
        })}
      </ItemsContainer>
    </VisibilityContainer>
  );
};

export default View;
