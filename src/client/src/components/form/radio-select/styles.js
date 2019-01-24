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
  transition: color 300ms linear;
  padding-left: 30px;
  z-index: 1;

  &:hover {
    color: green;
  }
`;

export const Radio = styled.input`
  position: absolute;
  visibility: hidden;

  &:checked ~ .check {
    background-color: steelblue;
  }

  &:checked ~ label {
    color: steelblue;
  }
`;

export const Check = styled.div`
  width: 20px;
  height: 20px;
  background-color: lightgrey;
  border-radius: 50%;
  transition: background-color 300ms linear;
  position: absolute;
  top: 10px;
  left: 0;
`;
