import React from 'react';
import { Heading, RadioContainer, RadioItem, Label, Radio, Check } from './styles';

const View = ({ title, items, selectedValue, onChange }) => {
  return (
    <div>
      <Heading>{title}</Heading>
      <RadioContainer className="radio-items">
        {items.map(item => {
          const itemId = `radioItem_${item.id}`;
          return (
            <RadioItem key={item.value} className="radio-item">
              <Radio type="radio"
                value={item.value}
                id={itemId}
                checked={item.value === selectedValue}
                onChange={() => onChange(item.value)} />
              <Label htmlFor={itemId}>{item.label}</Label>
              <Check className="check"/>
            </RadioItem>
          )
        })}
      </RadioContainer>
    </div>);
}

export default View;
