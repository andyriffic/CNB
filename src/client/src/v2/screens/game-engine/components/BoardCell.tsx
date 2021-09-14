import React from 'react';
import styled from 'styled-components';
import { isFeatureEnabled } from '../../../../featureToggle';
import { GameBoardCell } from '../types';

const CELL_SIZE_PX = 30;

const PositionContainer = styled.div`
  position: absolute;
`;

const Container = styled.div`
  /* border: 3px solid purple; */
  border-radius: 50%;
  position: relative;
  width: ${CELL_SIZE_PX}px;
  height: ${CELL_SIZE_PX}px;
`;

const Icon = styled.div`
  font-size: 1.2rem;
`;

const LocationMarker = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: purple;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

type Props = {
  cell: GameBoardCell;
};

const debug = isFeatureEnabled('debug');

export const BoardCell = ({ cell }: Props): JSX.Element => {
  return (
    <PositionContainer
      style={{
        top: `${cell.coordinates.y - CELL_SIZE_PX}px`,
        left: `${cell.coordinates.x - CELL_SIZE_PX}px`,
      }}
    >
      <Container>
        {/* {cell.type} */}
        {cell.behaviour.type === 'ladder' && <Icon>✈️</Icon>}
        {debug && <LocationMarker />}
      </Container>
    </PositionContainer>
  );
};
