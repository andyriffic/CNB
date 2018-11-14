import styled from 'styled-components';

export const FullViewPort = styled.div`
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    min-height: 100vh;
    padding: 10px;
    overflow-y: scroll;
`

export const MobilePageHeader = styled.div`
    font-size: 50px;
    text-align: center;
`

export const DesktopPageHeader = styled.div`
    font-size: 70px;
    text-align: center;
    padding: 20px 0;
`

export const CenteredContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 0;
`;

export const PlayerSpectatorContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

export const PlayerSpectatorSection = styled.div`
`

export const PageFooterContainer = styled.div`
    margin-top: 100px;
    text-align: center;
`

export const Button = styled.button`
    border-radius: 50%;
    cursor: pointer;
    font-size: 50px;
    padding: 20px;
    font-family: inherit;

    &:hover {
    color: white;
    background-color: black;
    }
`;