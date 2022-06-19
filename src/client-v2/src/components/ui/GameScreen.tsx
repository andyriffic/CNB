import styled from 'styled-components';
import { isDebugFeatureEnabled } from '../../utils/featureToggle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primaryBackground};
`;

const Main = styled.div`
  border: 1px solid black;
  width: 100vw;
  flex: 1;
  max-height: 100vh;
  overflow: hidden;
`;

const Debug = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 20px;
  border: 2px solid black;
  background-color: #ccc;
  overflow: scroll;
  max-height: 100vh;
`;

type Props = {
  children: React.ReactNode;
  debugContent?: React.ReactNode;
};

const isDebug = isDebugFeatureEnabled();

export function UiGameScreen({ children, debugContent }: Props): JSX.Element {
  return (
    <Container>
      <Main>{children}</Main>
      {isDebug && debugContent && <Debug>{debugContent}</Debug>}
    </Container>
  );
}
