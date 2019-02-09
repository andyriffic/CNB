import React, { useState } from 'react';
import FullPage from '../../components/page-layout/FullPage';
import MultiArea from '../../components/multi-area';

const View = () => {
  const [showIndex, setShowIndex] = useState(0);

  return (
    <FullPage pageTitle="Test">
      <div
        style={{
          backgroundColor: 'lightgreen',
          padding: '100px 10px',
        }}
      >
        <div>
          <label htmlFor="showIndex_0">
            <input
              id="showIndex_0"
              onClick={() => setShowIndex(0)}
              type="radio"
              name="showIndex"
              value={0}
            />
            0
          </label>
          <label htmlFor="showIndex_1">
            <input
              id="showIndex_1"
              onClick={() => setShowIndex(1)}
              type="radio"
              name="showIndex"
              value={1}
            />
            1
          </label>
        </div>
        <MultiArea showIndex={showIndex}>
          <p>SOme text</p>
          <p>SOme more text</p>
        </MultiArea>
      </div>
    </FullPage>
  );
};

export default View;
