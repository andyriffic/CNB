import { obstacleTrackBehaviour } from './trackBehaviours';
import { RacingTrack, RacingTrackSection } from './types';

export function withDynamicRoadBlocks(
  track: RacingTrack,
  roadBlockSection: number
): RacingTrack {
  if (roadBlockSection < 0 || roadBlockSection > track.sections.length - 1) {
    return track;
  }

  //TODO add obstacle to track section

  return {
    ...track,
    sections: track.sections.map<RacingTrackSection>((section, index) => {
      if (index === roadBlockSection) {
        return {
          ...section,
          lanes: section.lanes.map(lane => ({
            ...lane,
            squares: lane.squares.map(square => ({
              ...square,
              type: obstacleTrackBehaviour,
            })),
          })),
        };
      }

      return section;
    }),
  };
}
