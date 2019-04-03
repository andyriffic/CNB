import React, { useContext } from 'react';
import styled from 'styled-components';
import GameThemeContext from '../../../../contexts/GameThemeContext';
import { DescriptionSection } from './DescriptionSection';

const Container = styled.div``;

const ImageContainer = styled.div`
  background-color: ${props => props.theme.headerBackgroundColor};
  border-radius: 10px 10px 0 0;
  padding: 20px 0;
`;

const Image = styled.div`
  width: 30vmin;
  height: 30vmin;
  margin: 0 auto;
`;

const DescriptionContainer = styled.div`
  background-color: white;
  border-radius: 0 0 10px 10px;
  padding: 0 20px 20px 20px;
`;

const Title = styled.h3`
  font-size: 3rem;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const StatsContainer = styled.div``;

const character = Component => {
  return <Component />;
};

export const PlayerSelectionCard = ({ moveSymbolKey }) => {
  const theme = useContext(GameThemeContext);

  return (
    <Container>
      <ImageContainer theme={theme.style}>
        <Image>
          {character(theme.characters.characterMapping[moveSymbolKey])}
        </Image>
      </ImageContainer>
      <DescriptionContainer>
        <Title>{theme.characters.nameMapping[moveSymbolKey]}</Title>
        <StatsContainer>
          <DescriptionSection
            title="Likes 喜欢"
            items={
              theme.characters.likes && theme.characters.likes[moveSymbolKey]
            }
          />
          <DescriptionSection
            title="Dislikes 不喜欢"
            items={
              theme.characters.dislikes &&
              theme.characters.dislikes[moveSymbolKey]
            }
          />
        </StatsContainer>
      </DescriptionContainer>
    </Container>
  );
};
