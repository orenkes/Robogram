import React, { useState } from "react";
import styled from "styled-components";

import { flexbox } from "../../../styles/mixins";

import Likes from "./Likes";
import Comments from "./Comments";
import TimeStamp from "./TimeStamp";
import CommentsSection from "./CommentsSection";

const Feedback = ({ timeStamp, likedBy, comments, postId }) => {
  const [commentIsClicked, setCommentIsClicked] = useState(false);
  const [whoLikedState, setWhoLikedState] = useState(likedBy);

  return (
    <FeedbackContainer>
      <ButtonsContainer>
        <Likes likedBy={likedBy} postId={postId} setWhoLikedState={setWhoLikedState} />
        <Comments commentIsClicked={commentIsClicked} postId={postId} setCommentIsClicked={setCommentIsClicked} />
        <TimeStamp timeStamp={timeStamp} />
      </ButtonsContainer>
      <CommentsSection whoLikedState={whoLikedState} postId={postId} comments={comments} commentIsClicked={commentIsClicked} />
      <LikesCounter>{whoLikedState.length} likes</LikesCounter>
    </FeedbackContainer>
  );
};

export default Feedback;

const FeedbackContainer = styled.div``;

const ButtonsContainer = styled.div`
  ${flexbox({ jc: "flex-start" })}
  width: 100%;
  font-size: 30px;
  flex-wrap: wrap;
  padding: 10px;
`;

const LikesCounter = styled.p`
  font-weight: bold;
  margin: 5px 0;
  padding: 0 4px;
`;
