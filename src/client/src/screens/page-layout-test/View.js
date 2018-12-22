import React from "react";
import FullPage from "../../components/page-layout/FullPage";

const View = () => {
  return (
    <FullPage pageTitle="Test">
      <div
        style={{
          backgroundColor: "lightgreen",
          padding: "100px 10px"
        }}
      >
        <p>SOme text</p>
        <p>SOme more text</p>
      </div>
    </FullPage>
  );
};

export default View;
