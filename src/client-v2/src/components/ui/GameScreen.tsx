import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primaryBackground};
`;

type Props = {
  children: React.ReactNode;
};

export function UiGameScreen({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}
