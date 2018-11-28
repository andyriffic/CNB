import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import MusicToggle from '../music-toggle';

const drawerWidth = 200;

const Drawer = styled.div`
  top: 0;
  width: ${drawerWidth}px;
  padding:20px 10px;
  box-shadow: 2px 0 5px -2px rgba(136, 136, 136, 0.8);
  background-color: #EEE;  
  border-radius: 0 0 10px 0;
  position: absolute;
  
  transition: transform 200ms linear;   
  transform: translateX(-${drawerWidth}px);
  
  &.open {
    transform: translateX(0);
  }
`;

const DrawerToggle = styled.div`
  width: 20px;
  height: 40px;
  background-color: #CCC;
  position: absolute;
  right: -20px;
  top: 0;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
`;

const View = () => {

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer className={open ? 'open' : 'closed'}>
      <DrawerToggle onClick={toggleDrawer}/>
      <MusicToggle/>
    </Drawer>
  );
};

export default View;
