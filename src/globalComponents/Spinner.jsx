import React from "react";
import styled, { keyframes } from "styled-components";
import { flexbox } from "../styles/mixins";

const Spinner = () => (
  <SpinnerBox>
    <SpinnerIcon />
  </SpinnerBox>
);

export default Spinner;

const SpinnerBox = styled.div`
  ${flexbox()}
  height: 100vh;
  margin: auto;
`;

const spin = keyframes`
to {
  transform: rotate(360deg);
}
`;

const SpinnerIcon = styled.div`
  border: 3px solid salmon;
  border-radius: 50%;
  border-right-color: transparent;
  width: 50px;
  height: 50px;
  animation: ${spin} 0.8s linear infinite;
`;
