import styled from 'styled-components';

const Heading = styled.h1`
  color: ${({ theme }) => theme.color.primaryText};
  font-weight: bold;
  font-size: 4rem;
`;

type Props = {
  children: React.ReactNode;
};

export function UiTitle({ children }: Props): JSX.Element {
  return <Heading>{children}</Heading>;
}
