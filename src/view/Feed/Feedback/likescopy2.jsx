import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { GlobalContext } from "../../../state/GlobalContext";

const Likes = ({ likedBy, postId, postChanges, updatePostData }) => {
  const [youLikedIt, setYouLikedIt] = useState(false);
  const [likedByState, setLikedByState] = useState(likedBy);
  // const [addOrRemoveLike, setAddOrRemoveLike] = useState([]);
  const { loggedUser } = useContext(GlobalContext);

  useEffect(() => {
    console.log("postChanges.likeBy=>", postChanges);
    didUserLikedThePost();
  }, [postChanges]);

  const didUserLikedThePost = () => {
    let userLikedIt = false;
    console.log("postchagnes like by", postChanges.likedBy);
    for (const liker in postChanges.likedBy) {
      if (loggedUser._id === liker.userId) {
        console.log("set to true happened");
        userLikedIt = true;
        setYouLikedIt(true);
      }
    }
    if (userLikedIt === false) {
      console.log("set to false happened");
      setYouLikedIt(false);
    }
  };

  const likePost = async () => {
    let addOrRemoveLike = [];
    if (youLikedIt === false) {
      addOrRemoveLike = [
        ...postChanges.likedBy,
        {
          userName: loggedUser.userName,
          userId: loggedUser._id
        }
      ];
      console.log("liked by: ", postChanges.likedBy);
    } else {
      addOrRemoveLike = likedBy.filter(userLike => userLike.userId !== loggedUser._id);
    }

    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8" // Indicates the content
      },
      body: JSON.stringify(addOrRemoveLike) // We send data in JSON format
    };

    await fetch(`https://instagram-database.youngwebdevs.now.sh/feed/like?_id=${postId}`, putMethod);
    // await fetch(`https://instagram-database.youngwebdevs.now.sh/feed/like/${postId}`, putMethod);
    updatePostData(postId);
    // const fetchedPost = await fetch(`https://instagram-database.youngwebdevs.now.sh/feed/onepost?postId=${postId}`);
    // const jsonPost = await fetchedPost.json();
    // console.log(jsonPost);
    // setLikedByState(jsonPost.likedBy);
  };

  return (
    <LikesBox onClick={() => likePost()}>
      <StyledFiHeart youLikedIt={youLikedIt} />
    </LikesBox>
  );
};

export default Likes;

const LikesBox = styled.div`
  flex-basis: 8%;
`;

const StyledFiHeart = styled(FiHeart)`
  fill: ${({ youLikedIt }) => (youLikedIt ? "crimson" : "white")};
  color: ${({ youLikedIt }) => (youLikedIt ? "crimson" : "black")};

  &:hover {
    cursor: pointer;
    color: crimson;
    transition: 0.3s ease-out;
  }
  transition: 0.3s ease-in;
`;
