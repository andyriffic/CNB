import React from 'react';
import { Heading, RadioContainer, RadioItem, Label, Radio, Check } from './styles';

const View = ({ title, items, selectedValue, onChange }) => {

  return (
    <div>
      <Heading>{title}</Heading>
      <RadioContainer className="radio-items">
        {items.map((item, index) => {
          const itemId = `item_${index}`;
          return (
            <RadioItem key={item.value} className="radio-item">
              <Radio type="radio"
                value={item.value}
                id={itemId}
                checked={item.value === selectedValue}
                onChange={() => onChange(item.value)} />
              <Label for={itemId}>{item.label}</Label>
              <Check className="check"/>
            </RadioItem>
          )
        })}
      </RadioContainer>
    </div>);
}

export default View;
