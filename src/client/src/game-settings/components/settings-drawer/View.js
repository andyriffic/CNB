import React, { useState } from 'react';
import styled from 'styled-components';
import SoundToggle from '../sound-toggle';
import { FancyLink } from '../../../components/FancyLink';

const drawerWidth = 300;

const Drawer = styled.div`
  z-index: 10;
  top: 0;
  width: ${drawerWidth}px;
  padding: 0 10px;
  box-shadow: 2px 0 5px -2px rgba(136, 136, 136, 0.8);
  background-color: #eee;
  border-radius: 0 0 10px 0;
  position: absolute;
  max-height: 100vh;

  transition: transform 200ms linear;
  transform: translateX(-${drawerWidth}px);

  &.open {
    transform: translateX(0);
  }
`;

const DrawerToggle = styled.div`
  width: 20px;
  height: 40px;
  background-color: #ccc;
  position: absolute;
  right: -20px;
  top: 0;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
`;

const Link = styled.a`
  display: block;
  font-size: 0.7rem;
  text-decoration: none;
  color: inherit;
`;

const View = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer className={open ? 'open' : 'closed'}>
      <DrawerToggle onClick={toggleDrawer} />
      <SoundToggle />
      <div>
        <Link href="/player-stats?feature=down-push">Go to Leaderboard</Link>
        <Link href="/player-stats?feature=ranking,down-push">
          Go to Alternate Leaderboard
        </Link>
        <Link href="/game-history">Go to Game History</Link>
        <Link href="/tournament-players">Tournament Players</Link>
        <Link href="/teams">Teams</Link>
        <FancyLink href="/tournament-info">Super secret info</FancyLink>
      </div>
    </Drawer>
  );
};

export default View;
