import React from "react";
import styled from "styled-components";

import { FiMessageSquare } from "react-icons/fi";

const Comments = ({ commentIsClicked, setCommentIsClicked }) => {
  return (
    <CommentsBox>
      <FiMessageSquare onClick={() => setCommentIsClicked(!commentIsClicked)} />
    </CommentsBox>
  );
};

export default Comments;

const CommentsBox = styled.div`
  position: relative;
  flex-basis: 8%;
  &:hover {
    cursor: pointer;
    color: dodgerblue;
    transition: 0.3s ease-out;
  }
  transition: 0.3s ease-in;
`;
