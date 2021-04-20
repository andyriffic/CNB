import React, { useEffect, useRef, useState, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { bounceAnimation } from '../../../../uplift/components/animations';
import { ShowThemedVariant } from '../../../components/ShowThemedVariant';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MoveKeys } from '../../../themes';

const Container = styled.div`
  width: 10vw;
  height: 10vw;
`;

const MoveIcon = styled.div<{ moving: boolean }>`
  font-size: 3rem;
  color: ${({ theme }) => theme.color.text01};
  ${({ moving }) =>
    moving &&
    css`
      animation: ${bounceAnimation} 500ms 0s 3;
    `}
`;

type Props = {
  moved: boolean;
  moveId?: string;
  revealed?: boolean;
};

export const PlayerMove = ({ moved, moveId, revealed = false }: Props) => {
  const theme = useThemeComponents();
  const revealTimeout = useRef<NodeJS.Timeout | undefined>();
  const [revealing, setRevealing] = useState(false);
  const [showMove, setShowMove] = useState(false);

  useEffect(() => {
    if (revealed && !revealTimeout.current) {
      setRevealing(true);
      revealTimeout.current = setTimeout(() => {
        setRevealing(false);
        setShowMove(true);
      }, 1600);
    } else {
      setShowMove(false);
    }
  }, [revealed]);

  useEffect(() => {
    if (!moved) {
      revealTimeout.current = undefined;
    }
  }, [moved]);

  return (
    <Container>
      {moved ? (
        <MoveIcon moving={revealing}>
          {showMove && moveId && theme ? (
            theme.moves[moveId as MoveKeys]
          ) : (
            <ShowThemedVariant placement="moveMade" />
          )}
        </MoveIcon>
      ) : (
        <ShowThemedVariant placement="moveWaiting" />
      )}
    </Container>
  );
};
