import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FiPlus } from "react-icons/fi";
import { flexbox } from "../../styles/mixins";

import Post from "./Post";
import { GlobalContext } from "../../state/GlobalContext";

const Feed = () => {
  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loggedUser } = useContext(GlobalContext);

  useEffect(() => {
    // console.log("{ ...loggedUser }", { ...loggedUser });
    getData();
  }, []);

  const getData = async () => {
    const fetchedData = await fetch(
      "https://instagram-database.youngwebdevs.now.sh/feed/allposts"
    );
    const jsonData = await fetchedData.json();
    // console.log("jsonData:", jsonData);
    setPostsData(jsonData);
    setIsLoading(false);
  };

  const alwaysReversedArray = () => {
    const reversedArray = [];
    for (let i = postsData.length - 1; i >= 0; i--) {
      reversedArray.push(<Post {...postsData[i]} key={postsData[i]._id} />);
    }
    return reversedArray;
  };

  return (
    <MainWrapper>
      {isLoading ? (
        <SpinnerBox>
          <Spinner />
        </SpinnerBox>
      ) : (
        // postsData.reverse().map(postData => <Post {...postData} key={postData._id} />)
        alwaysReversedArray()
      )}
      <AddNewPost>
        {/* <AddPostContainer> */}
        <StyledLink to="/addpost">
          <FiPlus />
        </StyledLink>
        {/* </AddPostContainer> */}
      </AddNewPost>
    </MainWrapper>
  );
};

export default Feed;

const MainWrapper = styled.div`
  width: 100%;
  background-color: white;
  overflow-x: hidden;
  scroll-behavior: smooth;

  max-width: 450px;
  margin: auto;
`;

const SpinnerBox = styled.div`
  ${flexbox()}
  height: 100vh;
`;

const spin = keyframes`
to {
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  border: 3px solid salmon;
  border-radius: 50%;
  border-right-color: transparent;
  width: 50px;
  height: 50px;
  animation: ${spin} 0.8s linear infinite;
`;

// const AddPostContainer = styled.div`
//   width: 100%;
//   ${flexbox({ jc: "flex-end" })}
//   position: fixed;
//   bottom: 15px;
//   right: 50%;
//   transform: translateX(215px);
// `;

const StyledLink = styled(Link)``;

const AddNewPost = styled.div`

/* ${flexbox({ jc: "flex-end" })} */
  position: fixed;
  bottom: 15px;
  right: 50%;
  transform: translateX(215px);
  padding-top: 8px;
  ${flexbox()};
  background-color: salmon;
  color: white;
  font-size: 26px;

  width: 60px;
  height: 60px;
  border-radius: 50%;

  background-image: linear-gradient(to top right, white, gray);
  box-shadow: 2px 2px 4px gray;

  opacity: 0.5;
  transition: 0.5s ease-out;

  @media(max-width: 450px){
    background-image: linear-gradient(to top right, purple, deeppink);
    opacity: 0.7;

    transform: translateX(190px);
  }

  &:hover{
    background-image: linear-gradient(to top right, purple, deeppink);
    box-shadow: 2px 2px 4px deeppink;

    transition: 0.5s ease-out;
    opacity: 1;
    cursor: pointer;
  }
`;
