import React from 'react';
import tinycolor from 'tinycolor2';

type Props = {
  color?: string;
  width?: number;
};

export const BubbleCar = ({ color = '#f00', width = 45 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="svg6018"
      viewBox="0 0 31.302 19.228"
      version="1.1"
      width={width}
    >
      <g id="layer1" transform="translate(-210.52 -343.34)">
        <g id="g6592-5" transform="matrix(1.5435 0 0 1.5435 -60.868 -214.01)">
          <g id="g6530-3">
            <g id="g6524-8" transform="translate(0 .000018506)">
              <rect
                id="rect5932-19"
                style={{ fillRule: 'evenodd', fill: '#000000' }}
                ry="2.0767"
                height="4.1533"
                width="6.2159"
                y="369.39"
                x="177.77"
              />
              <rect
                id="rect5932-1-6"
                style={{ fillRule: 'evenodd', fill: '#000000' }}
                ry="2.0767"
                height="4.1533"
                width="6.2159"
                y="369.39"
                x="189.3"
              />
              <rect
                id="rect5932-0-3"
                style={{ fillRule: 'evenodd', fill: '#000000' }}
                ry="2.0767"
                height="4.1533"
                width="6.2159"
                y="361.09"
                x="189.3"
              />
              <rect
                id="rect5932-7-5"
                style={{ fillRule: 'evenodd', fill: '#000000' }}
                ry="2.0767"
                height="4.1533"
                width="6.2159"
                y="361.09"
                x="177.77"
              />
            </g>
            <path
              id="rect11750-9-4"
              style={{
                fillRule: 'evenodd',
                fill: color,
                stroke: '#000000',
                strokeWidth: 0.57509,
              }}
              d="m178.65 363.74c3.4194-1.9572 12.733-0.96069 16.282 1.8996 1.166 0.93973 1.1943 2.7641-0.00086 3.6865-3.615 2.7899-12.939 3.4174-16.283 1.4181-3.3444-1.9993-3.4178-5.047 0.002-7.0042z"
            />
          </g>
          <path
            id="path11753-8-0"
            d="m185.06 367.49c-0.0002 0.85605-0.28191 1.3824-1.5423 1.3821s-2.2819-0.6945-2.2817-1.5506c0.0002-0.85605 1.0221-1.5498 2.2824-1.5495 1.2604 0.0003 1.5417 0.8619 1.5415 1.718z"
            style={{
              fillRule: 'evenodd',
              fill: tinycolor(color)
                .complement()
                .toHexString(),
              stroke: '#000000',
              strokeWidth: 0.57509,
            }}
          />
        </g>
      </g>
    </svg>
  );
};
