import styled from 'styled-components';

export const FullViewPort = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    min-height: 100vh;
    padding: 30px 10px;
    //background-color: steelblue;
    overflow-y: scroll;
`

export const MobilePageHeader = styled.div`
    font-size: 50px;
    text-align: center;
`
export const CenteredContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 0;
`;