import React from 'react';
import styled from 'styled-components';

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
  border: 2px solid red;
  flex: 0 0 auto;
`;

const View = ({ items, selectedItemIndex = 0, onItemSelected }) => {
  return (
    <VisibilityContainer>
      <ItemsContainer selectedItem={selectedItemIndex}>
        {items.map((Item, index) => {
          return (
            <ItemContainer key={index} onClick={() => onItemSelected(index)}>
              {Item}
            </ItemContainer>
          );
        })}
      </ItemsContainer>
    </VisibilityContainer>
  );
};

export default View;
