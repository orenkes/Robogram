import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { GlobalContext } from "../../../state/GlobalContext";

const Likes = ({ likedBy, postId }) => {
  const [youLikedIt, setYouLikedIt] = useState(false);
  const [likedByState, setLikedByState] = useState(likedBy);
  // const [addOrRemoveLike, setAddOrRemoveLike] = useState([]);
  const { loggedUser } = useContext(GlobalContext);

  useEffect(() => {
    didUserLikedThePost();
  }, [likedByState]);

  const didUserLikedThePost = async () => {
    let userLikedIt = false;

    for (const liker of likedByState) {
      if (loggedUser._id === liker.userId) {
        setYouLikedIt(true);
        userLikedIt = true;
        // console.log("set to true happened");
      }
    }
    if (userLikedIt === false) {
      setYouLikedIt(false);
      // console.log("set to false happened");
    }
  };

  const likePost = async () => {
    let addOrRemoveLike = [];
    if (youLikedIt === false) {
      addOrRemoveLike = [
        ...likedByState,
        {
          userName: loggedUser.userName,
          userId: loggedUser._id
        }
      ];
      // console.log("liked by: ", likedByState);
    } else {
      addOrRemoveLike = likedByState.filter(
        userLike => userLike.userId !== loggedUser._id
      );
    }

    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8" // Indicates the content
      },
      body: JSON.stringify(addOrRemoveLike) // We send data in JSON format
    };

    await fetch(
      `https://instagram-database.youngwebdevs.now.sh/feed/like?_id=${postId}`,
      putMethod
    );
    // await fetch(`https://instagram-database.youngwebdevs.now.sh/feed/like/${postId}`, putMethod);

    const fetchedPost = await fetch(
      `https://instagram-database.youngwebdevs.now.sh/feed/onepost?postId=${postId}`
    );
    const jsonPost = await fetchedPost.json();
    // console.log(jsonPost);
    setLikedByState(jsonPost.likedBy);
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
