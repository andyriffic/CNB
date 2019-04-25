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
    { name: 'Shuming', imageName: 'shuming' },
    { name: 'Yingjian', imageName: 'yingjian' },
    { name: 'Yixing', imageName: 'yixing' },
  ],
  MELB: [
    { name: 'Albert', imageName: 'albert' },
    { name: 'Alex', imageName: 'alex' },
    { name: 'Andy', imageName: 'andy' },
    { name: 'Azra', imageName: 'azra' },
    { name: 'Chris', imageName: 'chris' },
    { name: 'Du', imageName: 'du' },
    { name: 'Duyen', imageName: 'duyen' },
    { name: 'Jay', imageName: 'jay' },
    { name: 'Jim', imageName: 'jim' },
    { name: 'Liujing', imageName: 'liujing' },
    { name: 'Marion', imageName: 'marion' },
    { name: 'Michael B', imageName: 'michael_b' },
    { name: 'Michael W', imageName: 'michael_w' },
    { name: 'Stacey', imageName: 'stacey' },
    { name: 'Ray', imageName: 'ray' },
    { name: 'Yujin', imageName: 'yujin' },
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
  };

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
