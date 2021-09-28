import { RacerHistoryRecord, RacerHistoryRecordsByDay } from '../types';
import { mockFlatHistory, mockHistory } from './mockHistory';

type UseRacingHistory = {
  dailyHistory: RacerHistoryRecordsByDay[];
  flatHistory: RacerHistoryRecord[];
};

export const useRacingHistory = (): UseRacingHistory => {
  return { dailyHistory: mockHistory, flatHistory: mockFlatHistory };
};
