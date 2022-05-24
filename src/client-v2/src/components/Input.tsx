import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 15px;
  border-radius: 15px;
`;

const Input = ({ onChange, controlledValue = "" }: { onChange: any; controlledValue?: string }) => {
  const [value, setValue] = useState(controlledValue);

  return (
    <StyledInput
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};

export default Input;
