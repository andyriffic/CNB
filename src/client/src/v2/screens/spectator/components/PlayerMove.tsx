import React, { useEffect, useRef, useState, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import mysteryImage from '../assets/move_mystery.png';
import { bounceAnimation } from '../../../../uplift/components/animations';
import { useMoveThemeProvider } from '../../../providers/MoveThemeProvider';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import { ShowThemedVariant } from '../../../components/ShowThemedVariant';

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

const MoveImage = styled.img`
  width: 100%;
  height: 100%;
`;

type Props = {
  moved: boolean;
  moveId?: string;
  revealed?: boolean;
};

export const PlayerMove = ({ moved, moveId, revealed = false }: Props) => {
  const { currentTheme } = useMoveThemeProvider();
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
          {showMove && moveId && currentTheme ? (
            <MoveImage
              src={`${SOCKETS_ENDPOINT}${currentTheme.moves[moveId].imageUrl}`}
            />
          ) : (
            <MoveImage src={mysteryImage} />
          )}
        </MoveIcon>
      ) : (
        <ShowThemedVariant placement="moveWaiting" />
      )}
    </Container>
  );
};
