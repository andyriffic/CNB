import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const DescriptionTitle = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 1.3rem;
`;

const DescriptionList = styled.ul`
  padding: 0 0 0 18px;
  margin: 0 0 10px 0;
  font-size: 1rem;
`;
const DescriptionListItem = styled.li``;

export const DescriptionSection = ({ title, items }) => {
  return (
    <Container>
      <DescriptionTitle>{title}</DescriptionTitle>
      <DescriptionList>
        {items &&
          items.map((item, index) => (
            <DescriptionListItem key={index}>{item}</DescriptionListItem>
          ))}
      </DescriptionList>
    </Container>
  );
};
