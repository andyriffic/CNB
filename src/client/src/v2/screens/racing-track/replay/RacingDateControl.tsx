import React from 'react';
import styled from 'styled-components';
import { ReplayUiState } from '.';
import { RacingHistoryState } from './useRacingHistory';

const RacingDateList = styled.div`
  display: flex;
  gap: 10px;
`;

const RacingDate = styled.div`
  font-size: 0.4rem;
  color: white;
  background-color: crimson;
  border-radius: 5px;
  padding: 4px;
`;

type Props = {
  replayUiState: ReplayUiState;
  racingHistoryState: RacingHistoryState;
};

export const RacingDateControl = ({
  replayUiState,
  racingHistoryState,
}: Props): JSX.Element => {
  return (
    <>
      <div>{replayUiState.currentTitle}</div>
      <RacingDateList>
        {racingHistoryState.loadedHistoryFiles.map(h => (
          <RacingDate key={h.key}>{h.title}</RacingDate>
        ))}
      </RacingDateList>
    </>
  );
};
