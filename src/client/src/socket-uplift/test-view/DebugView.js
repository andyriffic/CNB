import React from 'react';

export const DebugView = ({ title, value }) => {
  return (
    <dl>
      <dt>{title}</dt>
      <dd>{JSON.stringify(value)}</dd>
    </dl>
  );
};
