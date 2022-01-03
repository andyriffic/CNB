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
          squares: [
            { coordinates: { x: 305, y: 150 }, type: boostTrackBehaviour(2) },
          ],
        },
      ],
    },
    {
      // 6
      rotationDegrees: -40,
      lanes: [
        {
          squares: [{ coordinates: { x: 286, y: 80 } }],
        },
        {
          squares: [{ coordinates: { x: 310, y: 105 } }],
        },
      ],
    },
    {
      // 7
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 380, y: 70 } }],
        },
      ],
    },
    {
      // 8
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 435, y: 70 } }],
        },
      ],
    },
    {
      // 9
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 495, y: 70 } }],
        },
        {
          squares: [{ coordinates: { x: 496, y: 95 } }],
        },
      ],
    },
    {
      // 10
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 555, y: 70 } }],
        },
        {
          squares: [{ coordinates: { x: 555, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 555, y: 120 } }],
        },
      ],
    },
    {
      // 11
      rotationDegrees: 0,
      lanes: [
        {
          squares: [
            { coordinates: { x: 610, y: 70 }, type: rockTrackBehaviour },
          ],
        },
        {
          squares: [{ coordinates: { x: 610, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 610, y: 120 } }],
        },
      ],
    },
    {
      // 12
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 670, y: 70 } }],
        },
        {
          squares: [{ coordinates: { x: 670, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 670, y: 120 } }],
        },
      ],
    },
    {
      // 13
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 730, y: 70 } }],
        },
        {
          squares: [{ coordinates: { x: 730, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 730, y: 120 } }],
        },
      ],
    },
    {
      // 14
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 790, y: 70 } }],
        },
        {
          squares: [{ coordinates: { x: 790, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 790, y: 120 } }],
        },
      ],
    },
    {
      // 15
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 840, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 840, y: 120 } }],
        },
      ],
    },
    {
      // 16
      rotationDegrees: 0,
      lanes: [
        {
          squares: [{ coordinates: { x: 900, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 900, y: 120 } }],
        },
      ],
    },
    {
      // 17
      rotationDegrees: 40,
      lanes: [
        {
          squares: [{ coordinates: { x: 960, y: 120 } }],
        },
      ],
    },
    {
      // 18
      rotationDegrees: 90,
      lanes: [
        {
          squares: [{ coordinates: { x: 985, y: 200 } }],
        },
      ],
    },
    {
      // 19
      rotationDegrees: 130,
      lanes: [
        {
          squares: [{ coordinates: { x: 960, y: 260 } }],
        },
      ],
    },
    {
      // 20
      rotationDegrees: 160,
      lanes: [
        {
          squares: [{ coordinates: { x: 890, y: 290 } }],
        },
      ],
    },
    {
      // 21
      rotationDegrees: 180,
      lanes: [
        {
          squares: [{ coordinates: { x: 820, y: 290 } }],
        },
        {
          squares: [{ coordinates: { x: 820, y: 320 } }],
        },
      ],
    },
  ],
};
