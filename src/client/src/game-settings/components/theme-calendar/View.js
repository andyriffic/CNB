import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { getThemeForDate } from '../../../themes/theme-providers';

const Heading = styled.h6`
  margin: 0;
`;

const Theme = styled.dl`
  margin: 0 0 5px;
  padding: 5px;
  color: ${props => props.themeStyle.textColor};
  background-image: ${props =>
    `linear-gradient(140deg, ${props.themeStyle.headerBackgroundColor}, ${props.themeStyle.pageBackgroundColor})`};
`;

const ThemeDate = styled.dt`
  font-size: 0.5rem;
  opacity: 0.8;
`;

const ThemeName = styled.dd`
  font-size: 0.6rem;
  margin: 0;
`;

const View = () => {
  const themesCalendar = [];

  for (let i = 1; i < 7; i++) {
    const dateMoment = moment().add(i, 'days');
    if (dateMoment.day() === 0 || dateMoment.day() === 6) {
      // Don't show Saturday or Sundays
      continue;
    }
    const theme = getThemeForDate(dateMoment.toDate());
    themesCalendar.push({ date: dateMoment, theme });
  }

  return (
    <div>
      <Heading>Coming up 接下來...</Heading>
      <div>
        {themesCalendar.map((themeDetails, index) => (
          <Theme key={index} themeStyle={themeDetails.theme.style}>
            <ThemeDate>{themeDetails.date.format('dddd, Do')}</ThemeDate>
            <ThemeName>{themeDetails.theme.name}</ThemeName>
          </Theme>
        ))}
      </div>
    </div>
  );
};

export default View;
