import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid #000;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  color: ${({ theme }) => theme.color.secondaryText};
  background-color: ${({ theme }) => theme.color.secondaryBackground};
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  font-size: 2rem;
`;

type Props = {
  children: ReactNode;
};

export function FeatureLabel({ children }: Props): JSX.Element {
  return <StyledLabel>{children}</StyledLabel>;
}
