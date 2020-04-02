import React from "react";
import styled from "styled-components";
import { flexbox } from "../../styles/mixins";
import Feedback from "./Feedback";

const Post = ({ _id, postBy, avatar, image, imageAngle, timeStamp, likedBy, comments, caption }) => {
  return (
    <MainPostContainer>
      <UserDetailsContainer postBy={postBy}>
        <UserAvatarContainer>
          <Avatar src={avatar} />
        </UserAvatarContainer>
        <UserNameContainer>
          <Name>{postBy}</Name>
        </UserNameContainer>
      </UserDetailsContainer>

      <PostContainer>
        <PostedImage image={image} imageAngle={imageAngle} />
        <Feedback timeStamp={timeStamp} likedBy={likedBy} comments={comments} postId={_id} />
        <PostedCaption>
          {/* <LikesCounter>{likedBy.length} likes</LikesCounter> */}
          <CaptionParagrapgh>
            <UserNameSpan>{`${postBy} `}</UserNameSpan>
            {caption}
          </CaptionParagrapgh>
        </PostedCaption>

        <HrLine />
      </PostContainer>
    </MainPostContainer>
  );
};
export default Post;

const MainPostContainer = styled.div`
  width: 100%;
  background-color: white;
`;

const UserDetailsContainer = styled.div`
  ${flexbox({ jc: "flex-start" })};
  margin: 5px;
  width: 100%;
  height: 50px;
  display: flexbox;
  flex-wrap: wrap;
`;

const UserAvatarContainer = styled.div`
  ${flexbox()};
  flex-basis: 12%;
  width: 12%;
  margin-right: 5px;
`;

const Avatar = styled.img`
  background-repeat: no-repeat;
  border: 1px solid gray;
  height: 45px;
  width: 45px;
  border-radius: 50%;
`;

const UserNameContainer = styled.div`
  flex-basis: 50%;
  width: 50%;
`;

const Name = styled.h3`
  font-weight: bold;
`;

const PostContainer = styled.div`
  width: 100%;
`;

const PostedImage = styled.div`
  background-image: url(${({ image }) => image});
  background-color: #cccccc;
  height: 450px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: rotate(${({ imageAngle }) => `${imageAngle}deg`});
`;

const PostedCaption = styled.div`
  width: 100%;
  padding: 5px;
`;

// const LikesCounter = styled.div`
//   font-weight: bold;
//   margin: 5px 0;
// `;

const CaptionParagrapgh = styled.p``;

const UserNameSpan = styled.span`
  font-weight: bold;
`;

const HrLine = styled.hr`
  width: 95%;
  margin: 10px auto 0;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
`;
