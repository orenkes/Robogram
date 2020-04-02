import React, { useState, useContext } from "react";
import styled from "styled-components";
import { flexbox } from "../../styles/mixins";
import { Link, Redirect } from "react-router-dom";
import { MdRotateRight } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { GlobalContext } from "../../state/GlobalContext";

const AddPost = () => {
  const { loggedUser } = useContext(GlobalContext);
  const [redirect, setRedirect] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFDvpNJ1bqPeSJnI33DWHtHc5LH90NnBGEHYmdxHA0E0dCaU_v&s"
  );
  const [imageExist, setImageExist] = useState(false);
  const [angle, setAngle] = useState(0);

  const onUpload = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async () => {
      await setUploadedImage(reader.result);
      setImageExist(true);
    };
  };

  const submitPost = async e => {
    e.preventDefault();
    if (imageExist) {
      const postForm = {
        postBy: loggedUser.userName,
        posterId: loggedUser._id,
        avatar: loggedUser.avatar,
        image: uploadedImage,
        imageAngle: angle,
        caption: e.target[0].value,
        timeStamp: Date.now(),
        likedBy: [],
        comments: []
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postForm)
      };

      await fetch(
        "https://instagram-database.youngwebdevs.now.sh/addpost",
        options
      );
      // console.log(postForm);
      setRedirect(true);
      // window.location.href = "/feed";
    }
  };

  return (
    <MainWrapper>
      {redirect && <Redirect push to="/feed" />}

      <PostPreview>
        <UploadForm onSubmit={submitPost}>
          <ImageDisplay currentImage={uploadedImage} angle={angle} />
          <RotateButton
            onClick={() => setAngle(angle + 90)}
            imageExist={imageExist}
          >
            <MdRotateRight />
          </RotateButton>

          {!imageExist && (
            <PleaseNote>{`* Due to database limitation please refer to using files that are under 1Mb,
                             Your Whatsapp gallrery would be ideal`}</PleaseNote>
          )}

          <CaptionInput
            placeholder="Your caption here..."
            pattern=".{1,60}"
            required
            title="Caption needs to be between 1 to 60 characters"
          />
          <UploadImageButton>
            <InputLabel htmlFor="uploadPhoto">
              <FiUpload />
              &nbsp; Upload an image
            </InputLabel>
            <ImageInput
              type="file"
              id="uploadPhoto"
              onChange={e => {
                onUpload(e);
              }}
            />
          </UploadImageButton>
          <SubmitPostButton type="submit" imageExist={imageExist}>
            Post to &nbsp;<FontSpan>Robogram</FontSpan>
          </SubmitPostButton>
          <StyledLink to="/">
            <CancelButton>Cancel</CancelButton>
          </StyledLink>
        </UploadForm>
      </PostPreview>
    </MainWrapper>
  );
};

export default AddPost;

const MainWrapper = styled.div`
  overflow-x: hidden;
  height: 100vh;
  background-image: linear-gradient(
    to top right,
    #ed0976,
    #db008e,
    #bc00a8,
    #8b00c2,
    #132dd8
  );
`;

const PostPreview = styled.div`
  margin: 30px auto;
  background: white;
  width: 90%;
  border-radius: 4px;
  padding: 40px 0;
  box-shadow: 2px 2px 10px rebeccapurple;
`;

//How to fix view on mobile
const UploadForm = styled.form`
  ${flexbox({ dir: "column", jc: "flex-start" })};
`;

const ImageDisplay = styled.div`
  width: 80%;
  height: 320px;
  border-radius: 3px;
  border: 1px solid gray;
  background-image: url(${({ currentImage }) => currentImage});
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: rotate(${({ angle }) => `${angle}deg`});
  /* transform: ${({ angle }) => `rotate(${angle}deg)`}; */
  z-index: 1;

  @media (max-width: 430px){
    width: 80%;
    height: 240px;
  }
`;

const RotateButton = styled.div`
  ${flexbox({ ai: "flex-end" })};
  font-size: 24px;
  padding: 5px;
  color: deeppink;
  border: 2px solid deeppink;
  height: 60px;
  width: 40px;
  position: relative;
  border-radius: 0 0 25px 25px;
  transform: ${({ imageExist }) =>
    imageExist ? "translateY(-25px)" : "translateY(-65px)"};
  transition: 0.2s ease-out;
  outline: none;
  box-shadow: 0px 2px 5px gray;
  text-shadow: 1px 1px 2px black;

  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const PleaseNote = styled.p`
  white-space: pre-wrap;
  font-size: 10px;
  line-height: 12px;
  position: relative;
  top: -45px;
  /* margin-top: 10px; */
`;

const CaptionInput = styled.input`
  width: 80%;
  height: 30px;
  margin: 0 0 30px;
  border-bottom: 1px solid gray;
  border-top: none;
  border-right: none;
  border-left: none;
  padding: 5px;
  outline: none;
`;

const UploadImageButton = styled.div`
  ${flexbox()};
  height: 50px;
  width: 200px;
  border: 3px solid deeppink;
  box-shadow: 0px 2px 5px gray;
  border-radius: 25px;
  font-size: 18px;
  color: deeppink;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const InputLabel = styled.label`
  ${flexbox()};
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const ImageInput = styled.input`
  display: none;
`;

const SubmitPostButton = styled.button`
  border: none;
  outline: none;
  background-color: white;
  margin: 30px 0;
  ${flexbox()};
  height: 50px;
  width: 200px;
  box-shadow: 0px 2px 5px gray;
  border-radius: 25px;
  font-size: 18px;
  color: ${({ imageExist }) => (imageExist ? "whitesmoke" : "gray")};
  background-image: ${({ imageExist }) =>
    imageExist
      ? "linear-gradient(to bottom left, #db008e, #bc00a8, #8b00c2)"
      : "gray"};
  opacity: ${({ imageExist }) => (imageExist ? 1 : 0.4)};
  transition: 0.2s ease-in;
  opacity: 0.7;

  &:hover {
    cursor: ${({ imageExist }) => (imageExist ? "pointer" : "null")};
    opacity: ${({ imageExist }) => (imageExist ? "1" : "0.7")};
  }
`;

const FontSpan = styled.span`
  font-family: "Pacifico", cursive;
`;

const CancelButton = styled.div`
  ${flexbox()};
  height: 50px;
  width: 200px;
  border: 3px solid deeppink;
  box-shadow: 0px 2px 5px gray;
  border-radius: 25px;
  font-size: 18px;
  color: deeppink;
  background-color: rgba(244, 32, 92, 0.1);
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
