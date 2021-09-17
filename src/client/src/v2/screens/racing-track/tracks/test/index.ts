import { RacingTrack } from '../../types';
import background from './race-track.png';

export const racingTrack: RacingTrack = {
  sections: [
    {
      lanes: [
        {
          squares: [{ coordinates: { x: 520, y: 517 } }],
        },
        {
          squares: [{ coordinates: { x: 520, y: 552 } }],
        },
        {
          squares: [{ coordinates: { x: 520, y: 590 } }],
        },
        {
          squares: [{ coordinates: { x: 520, y: 625 } }],
        },
      ],
    },
    {
      lanes: [
        {
          squares: [{ coordinates: { x: 455, y: 517 } }],
        },
        {
          squares: [{ coordinates: { x: 455, y: 552 } }],
        },
        {
          squares: [{ coordinates: { x: 455, y: 590 } }],
        },
        {
          squares: [{ coordinates: { x: 455, y: 625 } }],
        },
      ],
    },
    {
      lanes: [
        {
          squares: [{ coordinates: { x: 390, y: 517 } }],
        },
        {
          squares: [{ coordinates: { x: 390, y: 552 } }],
        },
        {
          squares: [{ coordinates: { x: 390, y: 590 } }],
        },
        {
          squares: [{ coordinates: { x: 390, y: 625 } }],
        },
      ],
    },
    {
      lanes: [
        {
          squares: [{ coordinates: { x: 325, y: 517 } }],
        },
        {
          squares: [{ coordinates: { x: 325, y: 552 } }],
        },
        {
          squares: [{ coordinates: { x: 325, y: 590 } }],
        },
        {
          squares: [{ coordinates: { x: 325, y: 625 } }],
        },
      ],
    },
    {
      lanes: [
        {
          squares: [{ coordinates: { x: 260, y: 517 } }],
        },
        {
          squares: [{ coordinates: { x: 260, y: 552 } }],
        },
        {
          squares: [{ coordinates: { x: 260, y: 590 } }],
        },
        {
          squares: [{ coordinates: { x: 260, y: 625 } }],
        },
      ],
    },
    {
      lanes: [
        {
          squares: [{ coordinates: { x: 190, y: 555 } }],
        },
        {
          squares: [{ coordinates: { x: 190, y: 610 } }],
        },
      ],
    },
    {
      lanes: [
        {
          squares: [{ coordinates: { x: 125, y: 555 } }],
        },
        {
          squares: [
            { coordinates: { x: 125, y: 600 } },
            { coordinates: { x: 80, y: 550 } },
          ],
        },
      ],
    },
  ],
  boardBackgroundImage: background,
  widthPx: 1000,
  heightPx: 650,
};
