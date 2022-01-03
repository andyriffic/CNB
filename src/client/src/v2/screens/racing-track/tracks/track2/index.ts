import { boostTrackBehaviour, rockTrackBehaviour } from '../../trackBehaviours';
import { RacingTrack } from '../../types';
import background from './race-track.png';

export const racingTrack: RacingTrack = {
  id: 'track2',
  totalLaps: 1,
  boardBackgroundImage: background,
  widthPx: 1000,
  heightPx: 650,
  sections: [
    {
      // 0
      rotationDegrees: 180,
      lanes: [
        {
          squares: [{ coordinates: { x: 590, y: 517 } }],
        },
        {
          squares: [{ coordinates: { x: 590, y: 552 } }],
        },
        {
          squares: [{ coordinates: { x: 590, y: 590 } }],
        },
        {
          squares: [{ coordinates: { x: 590, y: 625 } }],
        },
      ],
    },
    {
      // 1
      crossesFinishLine: true,
      rotationDegrees: 180,
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
      // 2
      rotationDegrees: 180,
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
      // 3
      rotationDegrees: 180,
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
      // 4
      rotationDegrees: 180,
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
      // 5
      rotationDegrees: 180,
      lanes: [
        {
          squares: [{ coordinates: { x: 260, y: 517 } }],
        },
        {
          squares: [
            { coordinates: { x: 260, y: 552 }, type: rockTrackBehaviour },
          ],
        },
        {
          squares: [
            { coordinates: { x: 260, y: 590 }, type: boostTrackBehaviour(3) },
          ],
        },
        {
          squares: [{ coordinates: { x: 260, y: 625 } }],
        },
      ],
    },
    {
      // 6
      rotationDegrees: 160,
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
      // 7
      rotationDegrees: 225,
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
    {
      // 8
      rotationDegrees: 270,
      lanes: [
        {
          squares: [{ coordinates: { x: 80, y: 480 } }],
        },
        {
          squares: [{ coordinates: { x: 125, y: 480 } }],
        },
      ],
    },
    {
      // 9
      rotationDegrees: 270,
      lanes: [
        {
          squares: [{ coordinates: { x: 75, y: 410 } }],
        },
        {
          squares: [
            { coordinates: { x: 110, y: 410 }, type: rockTrackBehaviour },
          ],
        },
        {
          squares: [{ coordinates: { x: 143, y: 410 } }],
        },
      ],
    },
    {
      // 10
      rotationDegrees: 270,
      lanes: [
        {
          squares: [{ coordinates: { x: 80, y: 355 } }],
        },
        {
          squares: [{ coordinates: { x: 117, y: 355 } }],
        },
        {
          squares: [{ coordinates: { x: 150, y: 355 } }],
        },
      ],
    },
    {
      // 11
      rotationDegrees: 270,
      lanes: [
        {
          squares: [{ coordinates: { x: 85, y: 290 } }],
        },
        {
          squares: [{ coordinates: { x: 120, y: 290 } }],
        },
        {
          squares: [{ coordinates: { x: 155, y: 290 } }],
        },
      ],
    },
    {
      // 12
      rotationDegrees: 270,
      lanes: [
        {
          squares: [
            { coordinates: { x: 95, y: 240 }, type: rockTrackBehaviour },
          ],
        },
        {
          squares: [{ coordinates: { x: 130, y: 240 } }],
        },
        {
          squares: [
            { coordinates: { x: 165, y: 240 }, type: boostTrackBehaviour(2) },
          ],
        },
      ],
    },
    {
      // 13
      rotationDegrees: 270,
      lanes: [
        {
          squares: [{ coordinates: { x: 113, y: 175 } }],
        },
        {
          squares: [{ coordinates: { x: 150, y: 175 } }],
        },
      ],
    },
    {
      // 14
      rotationDegrees: 320,
      lanes: [
        {
          squares: [{ coordinates: { x: 170, y: 120 } }],
        },
        {
          squares: [
            { coordinates: { x: 130, y: 120 } },
            { coordinates: { x: 175, y: 85 } },
          ],
        },
      ],
    },
    {
      // 15
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 230, y: 82 } }],
        },
        {
          squares: [{ coordinates: { x: 230, y: 110 } }],
        },
      ],
    },
    {
      // 16
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 290, y: 80 } }],
        },
        {
          squares: [{ coordinates: { x: 290, y: 115 } }],
        },
      ],
    },
    {
      // 17
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 350, y: 67 } }],
        },
        {
          squares: [{ coordinates: { x: 350, y: 95 } }],
        },
        {
          squares: [
            { coordinates: { x: 350, y: 122 }, type: rockTrackBehaviour },
          ],
        },
      ],
    },
    {
      // 18
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 410, y: 67 } }],
        },
        {
          squares: [{ coordinates: { x: 410, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 410, y: 122 } }],
        },
      ],
    },
    {
      // 19
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 470, y: 67 } }],
        },
        {
          squares: [{ coordinates: { x: 470, y: 95 } }],
        },
        {
          squares: [{ coordinates: { x: 470, y: 122 } }],
        },
      ],
    },
    {
      // 20
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 525, y: 69 } }],
        },
        {
          squares: [{ coordinates: { x: 525, y: 97 } }],
        },
        {
          squares: [{ coordinates: { x: 525, y: 124 } }],
        },
      ],
    },
    {
      // 21
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 585, y: 70 } }],
        },
        {
          squares: [
            { coordinates: { x: 585, y: 100 }, type: rockTrackBehaviour },
          ],
        },
        {
          squares: [{ coordinates: { x: 585, y: 128 } }],
        },
      ],
    },
    {
      // 22
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 645, y: 72 } }],
        },
        {
          squares: [{ coordinates: { x: 645, y: 102 } }],
        },
        {
          squares: [{ coordinates: { x: 645, y: 130 } }],
        },
      ],
    },
    {
      // 23
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 705, y: 74 } }],
        },
        {
          squares: [{ coordinates: { x: 705, y: 102 } }],
        },
        {
          squares: [{ coordinates: { x: 705, y: 130 } }],
        },
      ],
    },
    {
      // 24
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 765, y: 80 } }],
        },
        {
          squares: [{ coordinates: { x: 765, y: 115 } }],
        },
      ],
    },
    {
      // 25
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 825, y: 87 } }],
        },
      ],
    },
    {
      // 26
      rotationDegrees: 400,
      lanes: [
        {
          squares: [{ coordinates: { x: 887, y: 98 } }],
        },
      ],
    },
    {
      // 27
      rotationDegrees: 450,
      lanes: [
        {
          squares: [{ coordinates: { x: 905, y: 165 } }],
        },
      ],
    },
    {
      // 28
      rotationDegrees: 490,
      lanes: [
        {
          squares: [{ coordinates: { x: 900, y: 220 } }],
        },
      ],
    },
    {
      // 29
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 835, y: 240 } }],
        },
      ],
    },
    {
      // 30
      rotationDegrees: 540,
      lanes: [
        {
          squares: [
            { coordinates: { x: 765, y: 215 }, type: boostTrackBehaviour(3) },
          ],
        },
        {
          squares: [{ coordinates: { x: 765, y: 245 } }],
        },
      ],
    },
    {
      // 31
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 705, y: 215 } }],
        },
        {
          squares: [{ coordinates: { x: 705, y: 245 } }],
        },
      ],
    },
    {
      // 32
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 645, y: 215 } }],
        },
        {
          squares: [{ coordinates: { x: 645, y: 245 } }],
        },
      ],
    },
    {
      // 33
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 580, y: 215 } }],
        },
        {
          squares: [
            { coordinates: { x: 580, y: 245 }, type: rockTrackBehaviour },
          ],
        },
      ],
    },
    {
      // 34
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 520, y: 212 } }],
        },
        {
          squares: [{ coordinates: { x: 520, y: 242 } }],
        },
      ],
    },
    {
      // 35
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 460, y: 212 } }],
        },
        {
          squares: [{ coordinates: { x: 460, y: 242 } }],
        },
      ],
    },
    {
      // 36
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 390, y: 212 } }],
        },
        {
          squares: [{ coordinates: { x: 390, y: 242 } }],
        },
      ],
    },
    {
      // 37
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 330, y: 220 } }],
        },
      ],
    },
    {
      // 38
      rotationDegrees: 500,
      lanes: [
        {
          squares: [{ coordinates: { x: 267, y: 230 } }],
        },
      ],
    },
    {
      // 39
      rotationDegrees: 450,
      lanes: [
        {
          squares: [{ coordinates: { x: 250, y: 300 } }],
        },
      ],
    },
    {
      // 40
      rotationDegrees: 400,
      lanes: [
        {
          squares: [{ coordinates: { x: 258, y: 360 } }],
        },
      ],
    },
    {
      // 41
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 325, y: 370 } }],
        },
      ],
    },
    {
      // 42
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 390, y: 370 } }],
        },
        {
          squares: [{ coordinates: { x: 390, y: 330 } }],
        },
      ],
    },
    {
      // 43
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 455, y: 380 } }],
        },
        {
          squares: [{ coordinates: { x: 455, y: 345 } }],
        },
        {
          squares: [{ coordinates: { x: 455, y: 317 } }],
        },
      ],
    },
    {
      // 44
      rotationDegrees: 360,
      lanes: [
        {
          squares: [
            { coordinates: { x: 520, y: 380 }, type: rockTrackBehaviour },
          ],
        },
        {
          squares: [{ coordinates: { x: 520, y: 345 } }],
        },
        {
          squares: [
            { coordinates: { x: 520, y: 317 }, type: rockTrackBehaviour },
          ],
        },
      ],
    },
    {
      // 45
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 590, y: 380 } }],
        },
        {
          squares: [
            { coordinates: { x: 590, y: 345 }, type: boostTrackBehaviour(3) },
          ],
        },
        {
          squares: [{ coordinates: { x: 590, y: 317 } }],
        },
      ],
    },
    {
      // 46
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 650, y: 380 } }],
        },
        {
          squares: [{ coordinates: { x: 650, y: 347 } }],
        },
        {
          squares: [{ coordinates: { x: 650, y: 317 } }],
        },
      ],
    },
    {
      // 47
      rotationDegrees: 360,
      lanes: [
        {
          squares: [{ coordinates: { x: 710, y: 380 } }],
        },
        {
          squares: [{ coordinates: { x: 710, y: 348 } }],
        },
        {
          squares: [{ coordinates: { x: 710, y: 317 } }],
        },
      ],
    },
    {
      // 48
      rotationDegrees: 360,
      lanes: [
        {
          squares: [
            { coordinates: { x: 780, y: 385 }, type: rockTrackBehaviour },
          ],
        },
        {
          squares: [{ coordinates: { x: 780, y: 352 } }],
        },
        {
          squares: [{ coordinates: { x: 780, y: 320 } }],
        },
      ],
    },
    {
      // 49
      rotationDegrees: 405,
      lanes: [
        {
          squares: [
            { coordinates: { x: 840, y: 320 } },
            { coordinates: { x: 900, y: 360 } },
            { coordinates: { x: 925, y: 410 } },
          ],
        },
        {
          squares: [
            { coordinates: { x: 840, y: 360 } },
            { coordinates: { x: 890, y: 410 } },
          ],
        },
        {
          squares: [{ coordinates: { x: 840, y: 395 } }],
        },
      ],
    },
    {
      // 50
      rotationDegrees: 450,
      lanes: [
        {
          squares: [{ coordinates: { x: 865, y: 470 } }],
        },
        {
          squares: [{ coordinates: { x: 900, y: 470 } }],
        },
        {
          squares: [
            { coordinates: { x: 937, y: 470 }, type: boostTrackBehaviour(2) },
          ],
        },
      ],
    },
    {
      // 51
      rotationDegrees: 500,
      lanes: [
        {
          squares: [{ coordinates: { x: 850, y: 530 } }],
        },
        {
          squares: [
            { coordinates: { x: 900, y: 530 } },
            { coordinates: { x: 850, y: 575 } },
          ],
        },
        {
          squares: [
            { coordinates: { x: 937, y: 530 } },
            { coordinates: { x: 920, y: 578 } },
            { coordinates: { x: 850, y: 620 } },
          ],
        },
      ],
    },
    {
      // 52
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 780, y: 545 } }],
        },
        {
          squares: [{ coordinates: { x: 780, y: 580 } }],
        },
        {
          squares: [{ coordinates: { x: 780, y: 625 } }],
        },
      ],
    },
    {
      // 53
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 720, y: 520 } }],
        },
        {
          squares: [{ coordinates: { x: 720, y: 560 } }],
        },
        {
          squares: [{ coordinates: { x: 720, y: 590 } }],
        },
        {
          squares: [{ coordinates: { x: 720, y: 630 } }],
        },
      ],
    },
    {
      // 54
      rotationDegrees: 540,
      lanes: [
        {
          squares: [{ coordinates: { x: 650, y: 520 } }],
        },
        {
          squares: [{ coordinates: { x: 650, y: 560 } }],
        },
        {
          squares: [{ coordinates: { x: 650, y: 590 } }],
        },
        {
          squares: [{ coordinates: { x: 650, y: 630 } }],
        },
      ],
    },
  ],
};
