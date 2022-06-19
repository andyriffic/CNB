import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  padding: 0.3em 1.2em;
  border: 0.16em solid black;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
  background-color: white;
  text-align: center;
  font-size: 0.7rem;
  text-transform: uppercase;
`;

type Props = {
  children: ReactNode;
};

export function Label({ children }: Props): JSX.Element {
  return <StyledLabel>{children}</StyledLabel>;
}
