import React from 'react';
import styled from 'styled-components';

//todo querystring param
const debug = false;

const FormattedDebugPre = styled.pre`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 5px;
`;

const DebugOutput = ({ data }) => {
  return debug ? (
    <React.Fragment>
      <h4>Debug</h4>
      <FormattedDebugPre>
        { JSON.stringify(data, null, 2) }
      </FormattedDebugPre>
    </React.Fragment>
  ): null;
}

export default DebugOutput;
