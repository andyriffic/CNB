import { boostTrackBehaviour, rockTrackBehaviour } from '../../trackBehaviours';
import { RacingTrack } from '../../types';
import background from './track-3.png';

export const racingTrack: RacingTrack = {
  id: 'track3',
  totalLaps: 1,
  boardBackgroundImage: background,
  widthPx: 1200,
  heightPx: 650,
  sections: [
    {
      // 0
      rotationDegrees: -90,
      lanes: [
        {
          squares: [{ coordinates: { x: 190, y: 420 } }],
        },
        {
          squares: [{ coordinates: { x: 225, y: 422 } }],
        },
        {
          squares: [{ coordinates: { x: 260, y: 424 } }],
        },
        {
          squares: [{ coordinates: { x: 295, y: 426 } }],
        },
      ],
    },
    {
      // 1
      crossesFinishLine: true,
      rotationDegrees: -90,
      lanes: [
        {
          squares: [{ coordinates: { x: 215, y: 360 } }],
        },
        {
          squares: [{ coordinates: { x: 250, y: 360 } }],
        },
        {
          squares: [{ coordinates: { x: 285, y: 360 } }],
        },
      ],
    },
    {
      // 2
      rotationDegrees: -90,
      lanes: [
        {
          squares: [{ coordinates: { x: 225, y: 305 } }],
        },
        {
          squares: [{ coordinates: { x: 260, y: 305 } }],
        },
        {
          squares: [{ coordinates: { x: 290, y: 305 } }],
        },
      ],
    },
    {
      // 3
      rotationDegrees: -90,
      lanes: [
        {
          squares: [{ coordinates: { x: 230, y: 250 } }],
        },
        {
          squares: [{ coordinates: { x: 263, y: 250 } }],
        },
        {
          squares: [{ coordinates: { x: 293, y: 250 } }],
        },
      ],
    },
    {
      // 4
      rotationDegrees: -90,
      lanes: [
        {
          squares: [{ coordinates: { x: 240, y: 200 } }],
        },
        {
          squares: [{ coordinates: { x: 270, y: 200 } }],
        },
        {
          squares: [{ coordinates: { x: 298, y: 200 } }],
        },
      ],
    },
    {
      // 5
      rotationDegrees: -85,
      lanes: [
        {
          squares: [{ coordinates: { x: 240, y: 150 } }],
        },
        {
          squares: [{ coordinates: { x: 275, y: 150 } }],
        },
        {
          squares: [{ coordinates: { x: 305, y: 150 } }],
        },
      ],
    },
  ],
};
