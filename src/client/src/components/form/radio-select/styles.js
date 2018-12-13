import styled from 'styled-components';

export const Heading = styled.h6`
  margin: 0;
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const RadioItem = styled.div`  
  width: 130px;
  height: 50px;
  position: relative;  
`;

export const Label = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  transition: all 0.25s linear;
  padding-left: 30px;
`;

export const Radio = styled.input`
  position: absolute;
  visibility: hidden;
  width: 100%;
  height: 100%;

  &:checked ~ .check {
    background-color: steelblue;
  }
`;

export const Check = styled.div`
  width: 20px; 
  height: 20px;
  background-color: lightgrey;
  border-radius: 50%;
  transition: all 300ms linear;
  position: absolute;
  top: 10px;
  left: 0;
`;
