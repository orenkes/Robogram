import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { flexbox } from "../../styles/mixins";
import { GlobalContext } from "../../state/GlobalContext";
import Spinner from "../../globalComponents/Spinner";
import { FiX } from "react-icons/fi";

const Profile = () => {
  const { loggedUser } = useContext(GlobalContext);
  const [boxIsOpen, setboxIsOpen] = useState(false);
  const [clickedPic, setClickedPic] = useState("");
  const [jsonState, setJsonState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [manageUploads, setManageUploads] = useState(false);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    const fetchedPosts = await fetch(`https://instagram-database.youngwebdevs.now.sh/feed/userposts?posterId=${loggedUser._id}`);
    const jsonPosts = await fetchedPosts.json();
    setJsonState(jsonPosts);
    setIsLoading(false);
  };

  const deletePost = async e => {
    console.log(e.currentTarget.id);
    const deleteMethod = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };

    await fetch(`https://instagram-database.youngwebdevs.now.sh/feed/?_id=${e.currentTarget.id}`, deleteMethod);
  };

  const bringPics = () => {
    let reversedPicsArray = [];
    for (let i = jsonState.length - 1; i >= 0; i--) {
      reversedPicsArray.push(
        <UploadContainer>
          {manageUploads && (
            <RemoveDiv>
              <StyledFiX id={jsonState[i]._id} onClick={e => deletePost(e)} />
            </RemoveDiv>
          )}
          <PicDisplay id={jsonState[i].image} image={jsonState[i].image} imageAngle={jsonState[i].imageAngle} onClick={e => enlargePic(e)} />
        </UploadContainer>
      );
    }
    return reversedPicsArray;
  };

  const enlargePic = e => {
    const clickedPic = e.target.id;
    setClickedPic(clickedPic);
    setboxIsOpen(true);
  };

  const convertTimeStamp = postTimeStamp => {
    const convertedPostTime = new Date(Number(postTimeStamp));
    const dayMonthString = String(convertedPostTime).slice(4, 10);
    const yearString = String(convertedPostTime).slice(11, 15);
    const dateString = `${dayMonthString}, ${yearString}`;
    return dateString;
  };

  return (
    <ProfileContainer>
      <UserDetailsBox>
        <AvatarBox src={loggedUser.avatar} />
        <DetailsList>
          <User>{loggedUser.userName}</User>
          <Email>
            {loggedUser.email}
            {` | Joined at ` + convertTimeStamp(loggedUser.creationDate)}
          </Email>
          <Manage onClick={() => setManageUploads(!manageUploads)} manageUploads={manageUploads}>{`Manage Your Uploads`}</Manage>
        </DetailsList>
      </UserDetailsBox>
      <OwnPostsContainer>
        {isLoading ? <Spinner /> : bringPics()}
        <BigPicBox boxIsOpen={boxIsOpen} onClick={() => setboxIsOpen(false)}>
          <Pic clickedPic={clickedPic} />
        </BigPicBox>
      </OwnPostsContainer>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const UserDetailsBox = styled.div`
  ${flexbox()};
  height: 100px;
  margin-bottom: 10px;
`;

const AvatarBox = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid gray;
`;

const DetailsList = styled.div`
  flex-basis: 70%;
  ${flexbox({ jc: "flex-start" })};
  flex-wrap: wrap;
  height: 80%;
  margin-left: 15px;
`;

const Manage = styled.div`
  flex-basis: 48%;
  font-size: 14px;
  line-height: 26px;
  text-align: center;
  opacity: 0.8;
  margin-top: 10px;
  background: ${({ manageUploads }) => (manageUploads ? "navy" : "royalblue")};
  color: white;
  border-radius: 4px;
  transition: 0.2s ease-out;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const User = styled.div`
  flex-basis: 100%;
  font-size: 38px;
  color: #121212;
  font-weight: bold;
  width: 100%;
`;

const Email = styled.div`
  ${flexbox({ jc: "flex-start" })};
  flex-basis: 100%;
  font-size: 12px;
`;

const OwnPostsContainer = styled.div`
  ${flexbox({ ai: "flex-start", jc: "space-between" })}
  flex-wrap: wrap;
  background: white;
  position: relative;
`;

const UploadContainer = styled.div`
  position: relative;
  flex-basis: 33%;
  height: 150px;
  margin-bottom: 2px;
`;

const RemoveDiv = styled.div`
  ${flexbox()};
  position: absolute;
  color: white;
  height: 100%;
  width: 100%;
  z-index: 3;
`;

const StyledFiX = styled(FiX)`
  font-size: 80px;
  opacity: 0.4;
  color: crimson;
  transition: 0.2s ease-out;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const PicDisplay = styled.div`
  background-image: url(${({ image }) => image});
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  transform: rotate(${({ imageAngle }) => `${imageAngle}deg`});
  height: 100%;
  width: 100%;
  overflow-x: hidden;
`;

const BigPicBox = styled.div`
  ${flexbox({ ai: "flex-start", jc: "space-around" })};
  transform: ${({ boxIsOpen }) => (boxIsOpen ? "scale(1,1)" : "scale(0,0)")};
  transition: 0.2s ease-out;
  position: absolute;
  height: 100vh;
  width: 100%;
`;

const Pic = styled.div`
  margin-top: 100px;
  height: 50%;
  width: 100%;

  background-image: url(${({ clickedPic }) => clickedPic});
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
