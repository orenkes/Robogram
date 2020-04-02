import React, { useState } from "react";
import styled from "styled-components";

import { flexbox } from "../../../styles/mixins";

import Likes from "./Likes";
import Comments from "./Comments";
import TimeStamp from "./TimeStamp";
import CommentsSection from "./CommentsSection";

const Feedback = ({ timeStamp, likedBy, comments, postId }) => {
  const [commentIsClicked, setCommentIsClicked] = useState(false);
  const [postChanges, setPostChanges] = useState({ likedBy, comments });

  const updatePostData = async postId => {
    const fetchedPost = await fetch(`https://instagram-database.youngwebdevs.now.sh/feed/onepost?postId=${postId}`);
    const jsonPost = await fetchedPost.json();
    const newobj = {
      likedBy: jsonPost.likedBy,
      comments: jsonPost.comments
    };
    console.log("postChanges--->", postChanges);
    setPostChanges(...postChanges, ...newobj);
  };

  return (
    <FeedbackContainer>
      <ButtonsContainer>
        <Likes likedBy={likedBy} postId={postId} postChanges={postChanges} updatePostData={updatePostData} />
        <Comments
          commentIsClicked={commentIsClicked}
          setCommentIsClicked={setCommentIsClicked}
          postChanges={postChanges}
          updatePostData={updatePostData}
        />
        <TimeStamp timeStamp={timeStamp} />
      </ButtonsContainer>
      <CommentsSection likedBy={likedBy} comments={comments} commentIsClicked={commentIsClicked} />
      <LikesCounter>{postChanges.likedBy.length} likes</LikesCounter>
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

const LikesCounter = styled.div`
  font-weight: bold;
  margin: 5px 0;
`;
