import React, { useState } from 'react';
import styled from 'styled-components';
import { PageSubTitle, Button } from '../../../styled';

const Select = styled.select`
  font-size: 2rem;
  color: white;
  text-align: center;
`;

const Option = styled.option`
  text-align: center;
`;

const avatarSelections = {
  XIAN: [
    { name: 'Bin', imageName: 'bin' },
    { name: 'Yixing', imageName: 'yixing' },
  ],
  MELB: [
    { name: 'Andy', imageName: 'andy' },
    { name: 'Michael B', imageName: 'michael_b' },
  ],
};

const guestSelections = {
  XIAN: [{ name: 'Guest', imageName: 'pikachu' }],
  MELB: [{ name: 'Guest', imageName: 'squirtle' }],
};

const EMPTY_AVATAR = { name: '' };

const View = ({ playerKey, onAvatarSelected }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(EMPTY_AVATAR);

  const onChange = e => {
    const selectedName = e.target.value;
    if (!selectedName) {
      setSelectedAvatar(EMPTY_AVATAR);
      return;
    }

    const avatar = avatarSelections[playerKey].find(
      a => a.name === selectedName
    );
    setSelectedAvatar(avatar);
    onAvatarSelected && onAvatarSelected(avatar);
  };

  const selectGuestAvatar = () => {
    const avatar = guestSelections[playerKey][0]; // TODO: can add more options and choose one at random
    onAvatarSelected && onAvatarSelected(avatar);
  }

  return (
    <div>
      <PageSubTitle>Select Player 選擇人</PageSubTitle>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Select onChange={onChange} value={selectedAvatar.name}>
          <Option value={null}>Please select</Option>
          {avatarSelections[playerKey].map(avatar => {
            return (
              <Option value={avatar.name} key={avatar.name}>
                {avatar.name}
              </Option>
            );
          })}
        </Select>
      </div>
      <PageSubTitle>OR</PageSubTitle>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={selectGuestAvatar}>Guest 客人</Button>
      </div>
    </div>
  );
};

export default View;
