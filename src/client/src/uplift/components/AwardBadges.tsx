import React from 'react';
import styled from 'styled-components';

type BadgeStyleDef = {
  icon: string;
  bgColor: string;
  title: string;
};

type BadgeStyleDefinitions = {
  SNAKES_AND_LADDERS_WINNER: BadgeStyleDef;
};

const badgeStyles: BadgeStyleDefinitions = {
  SNAKES_AND_LADDERS_WINNER: {
    icon: '🐍',
    bgColor: 'lightgrey',
    title: 'Won Snakes and Ladders',
  },
};

const Container = styled.div`
  font-size: 1rem;
`;

const Badge = styled.div<{ styleDef: BadgeStyleDef }>`
  width: 50px;
  height: 50px;
  font-size: 1.1rem;
  background: ${props => props.styleDef.bgColor};
  border-radius: 50%;
  color: #fff;
  padding: 10px;
  border: 3px solid #fff;
  text-align: center;
  display: inline-block;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const Icon = styled.i`
  font-size: 1.8em;
  display: block;
  font-style: normal;
`;

const Text = styled.div`
  display: inline-block;
  margin-top: 1em;
`;

type Props = {
  badgeType: keyof BadgeStyleDefinitions;
};

export const AwardBadge = ({ badgeType }: Props) => {
  const styleDef = badgeStyles[badgeType];

  return (
    <Badge title={styleDef.title} styleDef={styleDef}>
      {styleDef.icon}
    </Badge>
  );
};
