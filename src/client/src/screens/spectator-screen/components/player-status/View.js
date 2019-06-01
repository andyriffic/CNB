/* @flow */
import React from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';

import TranslatedPlayerName from '../../../../components/translated-player-name';
import WaitingIndicator from '../../../../components/waiting-indicator';

type Props = {
  moved: boolean,
  name: string,
  badge?: ComponentType<*>,
  avatar: Object,
};

const Title = styled.div`
  margin: 0;
  padding: 5px 0;
  font-size: 0.8rem;
  color: #20253f;
`;

const BadgeContainer = styled.div`
  width: 25%;
  height: 25%;
  display: flex;
  opacity: 0.7;
`;

const View = ({ moved, name, badge, avatar }: Props) => {
  return (
    <WaitingIndicator loaded={moved}>
      <Title>
        <TranslatedPlayerName playerName={name} />
      </Title>
      <p style={{ margin: '0', padding: '0' }}>
        {avatar ? `${avatar.name} ✅` : 'Waiting 等候...'}
      </p>
      {badge && <BadgeContainer>{badge}</BadgeContainer>}
    </WaitingIndicator>
  );
};

export default View;
