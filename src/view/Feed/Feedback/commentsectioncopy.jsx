import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { GlobalContext } from "../../../state/GlobalContext";
import { flexbox } from "../../../styles/mixins";
import { element } from "prop-types";

const CommentsSection = ({
  comments,
  commentIsClicked,
  whoLikedState,
  postId
}) => {
  const { loggedUser } = useContext(GlobalContext);
  const [commentsArray, setCommentsArray] = useState(comments);
  const [myCommentsArray, setMyCommentsArray] = useState([]);

  useEffect(() => {
    createSmartCommentsArray();
  }, [commentsArray]);

  const createSmartCommentsArray = () => {
    let newArray = [];
    for (const comment of commentsArray) {
      let myComment = false;
      if (loggedUser._id === comment.commentUserId) {
        myComment = true;
      }
      newArray.push(
        <CommentLi key={comment.uniqueKey}>
          {`${comment.commentBy} `}
          <UserNameSpan>{comment.commentBody}</UserNameSpan>
          <DeleteComment myComment={myComment}>
            <MdClose
              id={comment.uniqueKey}
              onClick={e => {
                deleteComment(e);
              }}
            />
          </DeleteComment>
        </CommentLi>
      );
    }
    setMyCommentsArray(newArray);
  };

  const whoLikedThat = () => {
    let usersWhoLikedStr = "";

    if (whoLikedState.length < 2) {
      for (const user of whoLikedState) {
        usersWhoLikedStr += `@${user.userName} `;
      }
    } else {
      for (let i = 0; i < 2; i++) {
        usersWhoLikedStr += `@${whoLikedState[i].userName} `;
      }
    }
    if (whoLikedState.length === 3) usersWhoLikedStr += ` and 1 more`;
    if (whoLikedState.length > 3)
      usersWhoLikedStr += `and ${whoLikedState.length - 2} others `;

    return usersWhoLikedStr;
  };

  const moreLikedThat = () => {
    let likedAddOnsStr = "";
    if (whoLikedState.length > 0) likedAddOnsStr += ` liked that`;
    return likedAddOnsStr;
  };

  const sendingNewComment = async e => {
    e.preventDefault();

    const messageInput = {
      commentBody: e.target[0].value,
      commentBy: loggedUser.userName,
      commentUserId: loggedUser._id,
      uniqueKey: loggedUser._id + Date.now() + Math.ceil(Math.random() * 999)
    };

    e.target[0].value = "";

    setCommentsArray([...commentsArray, messageInput]);
    const newComments = [...commentsArray, messageInput];
    // console.log("newComments", newComments);

    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json" // Indicates the content
      },
      body: JSON.stringify(newComments) // We send data in JSON format
    };

    await fetch(
      `https://instagram-database.youngwebdevs.now.sh/feed/comment?_id=${postId}`,
      putMethod
    );
  };

  const deleteComment = async e => {
    const uniqueKeyClicked = e.target.id;
    const arrayAfterRemove = commentsArray.filter(
      comment => comment.uniqueKey !== uniqueKeyClicked
    );
    setCommentsArray(arrayAfterRemove);

    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json" // Indicates the content
      },
      body: JSON.stringify(arrayAfterRemove) // We send data in JSON format
    };

    await fetch(
      `https://instagram-database.youngwebdevs.now.sh/feed/comment?_id=${postId}`,
      putMethod
    );
  };

  return (
    <CommentsDisplay commentIsClicked={commentIsClicked}>
      <LikedBy>
        {whoLikedThat()}
        <LikedAddOns>{moreLikedThat()}</LikedAddOns>
      </LikedBy>
      <CommentsUl>{myCommentsArray}</CommentsUl>
      <NewCommentForm onSubmit={e => sendingNewComment(e)}>
        <NewCommentInput
          type="text"
          placeholder="Write something bitch"
          pattern=".{1,30}"
          required
          title="Comment needs to be between 1 to 15 characters"
        />
        <SendFormButton>
          <FiSend />
        </SendFormButton>
      </NewCommentForm>
    </CommentsDisplay>
  );
};

export default CommentsSection;

const CommentsDisplay = styled.div`
  display: ${({ commentIsClicked }) => (commentIsClicked ? "block" : "none")};
  width: 100%;
  padding: 5px 10px;
  line-height: 22px;
  background-color: ghostwhite;
  font-size: 16px;
`;

const LikedBy = styled.p`
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 5px;
`;

const LikedAddOns = styled.span`
  font-weight: 500;
`;

const CommentsUl = styled.ul``;

const CommentLi = styled.li`
  font-weight: bold;
  position: relative;
`;

const UserNameSpan = styled.span`
  font-weight: 400;
`;

const DeleteComment = styled.div`
  ${flexbox()}
  text-align: right;
  display: ${({ myComment }) => (myComment ? "block" : "none")};
  width: 100%;
  opacity: 0;
  padding-right: 16px;
  position: absolute;
  right: 0px;
  top: 0px;
  transition: 0.3s ease-out;
  outline: none;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const NewCommentForm = styled.form``;

const SendFormButton = styled.button`
  background-color: ghostwhite;
  border: none;
  margin-left: 10px;
  opacity: 0.8;
  transition: 0.3s ease-out;
  outline: none;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const NewCommentInput = styled.input`
  border: none;
  width: 90%;
  border-bottom: 1px solid gray;
  background: none;
  outline: none;
`;
