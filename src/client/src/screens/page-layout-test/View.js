import React, { useContext } from "react";
import styled from "styled-components";
import { FullPage } from "./components/FullPage";

const View = () => {
  return (
    <FullPage
      pageTitle="Test"
      bodyComponent={
        <div
          style={{
            backgroundColor: "lightgreen",
            padding: "100px 10px"
          }}
        >
          <p>SOme text</p>
          <p>SOme more text</p>
        </div>
      }
    />
  );
};

export default View;
