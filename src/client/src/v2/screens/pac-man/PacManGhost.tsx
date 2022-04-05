import React from 'react';
import tinycolor from 'tinycolor2';

type Props = {
  color?: string;
  width?: number | string;
};

export const PacManGhost = ({ color = '#f00', width = 30 }: Props) => {
  const shadeColor = tinycolor(color)
    .darken(20)
    .toHexString();

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 280.173 280.173"
      width={width}
    >
      <g>
        <path
          style={{ fill: color }}
          d="M133.961,0.145C63.079,3.645,8.824,64.026,8.824,134.908v66.506l0,0c0,15.752,0,48.13,0,65.631
     c0,6.126,6.126,9.626,11.376,6.126l20.127-12.251c7.876-4.375,17.502-4.375,25.377,0l18.377,10.501
     c7.876,4.375,17.502,4.375,25.377,0l18.377-10.501c7.876-4.375,17.502-4.375,25.377,0l18.377,10.501
     c7.876,4.375,17.502,4.375,25.377,0l18.377-10.501c7.876-4.375,17.502-4.375,25.377,0l19.252,11.376
     c5.251,2.625,11.376-0.875,11.376-6.126c0-18.377,0-50.755,0-65.631l0,0v-70.007C271.349,57.025,209.218-3.355,133.961,0.145z"
        />
        <g>
          <g>
            <g>
              <path
                style={{ fill: shadeColor }}
                d="M26.325,131.408c0-69.132,54.255-126.012,122.512-131.263c-2.625,0-6.126,0-8.751,0
                 C67.454,0.145,8.824,58.776,8.824,131.408c0,0,0,147.889,0,148.765c7.876,0,13.126-3.5,17.502-7.876
                 C26.325,256.545,26.325,131.408,26.325,131.408z"
              />
            </g>
          </g>
        </g>
        <path
          style={{ fill: '#E4E7E7' }}
          d="M188.216,113.906c-16.627,0-30.628,14.001-30.628,30.628s14.001,30.628,30.628,30.628
     s30.628-14.001,30.628-30.628S204.843,113.906,188.216,113.906z M91.957,113.906c-16.627,0-30.628,14.001-30.628,30.628
     s14.001,30.628,30.628,30.628s30.628-14.001,30.628-30.628S108.583,113.906,91.957,113.906z"
        />
        <path
          style={{ fill: '#324D5B' }}
          d="M188.216,131.408c-7.001,0-13.126,6.126-13.126,13.126c0,7.001,6.126,13.126,13.126,13.126
     s13.126-6.126,13.126-13.126C201.342,137.533,195.217,131.408,188.216,131.408z M91.957,131.408
     c-7.001,0-13.126,6.126-13.126,13.126c0,7.001,6.126,13.126,13.126,13.126c7.001,0,13.126-6.126,13.126-13.126
     C105.083,137.533,98.957,131.408,91.957,131.408z"
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
};
