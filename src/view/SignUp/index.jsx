import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { flexbox } from "../../styles/mixins";
import { Redirect } from "react-router-dom";

const SignUp = () => {
  const [wrongUser, setWrongUser] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [userPasswordState, setUserPasswordState] = useState("");
  const [userPasswordConfirmationState, setUserPasswordConfirmationState] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userAvatarPic, setUserAvatarPic] = useState("InstagramLogo.png");

  const signUpForm = async e => {
    e.preventDefault();
    const inputEmail = e.target[0].value;
    const inputUserName = e.target[1].value;
    const inputPassword = e.target[2].value;
    const inputConfirmPassword = e.target[3].value;
    const randomAvatar = Math.floor(Math.random() * (999999 - 0)) + 0;

    if (inputEmail === "" || inputUserName === "" || inputPassword === "") {
      setPopUpMessage("One or more of the inputs are empty");
      setWrongUser(true);
      setTimeout(() => {
        setWrongUser(false);
      }, 3000);
    } else if (inputConfirmPassword !== inputPassword) {
      setPopUpMessage("Passwords do not match");
      setWrongUser(true);
      setTimeout(() => {
        setWrongUser(false);
      }, 3000);
    } else {
      const newUserObject = {
        email: inputEmail,
        userName: inputUserName,
        password: inputPassword,
        avatar: `http://robohash.org/${randomAvatar}`,
        creationDate: Date.now()
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserObject)
      };

      await fetch("https://instagram-database.youngwebdevs.now.sh/login", options);
      // window.location.href = "/login";
      setRedirect(true);
    }
  };

  const passwordCheck = e => {
    const currentPassInput = e.target.value;
    setUserPasswordState(e.target.value);
    if (currentPassInput === userPasswordConfirmationState && currentPassInput !== "") {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const passwordConfirmationCheck = e => {
    const currentPassConfirmInput = e.target.value;
    setUserPasswordConfirmationState(e.target.value);
    if (currentPassConfirmInput === userPasswordState && currentPassConfirmInput !== "") {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const changeAvatarPic = e => {
    if (e.target.value === "") {
      setUserAvatarPic("InstagramLogo.png");
    } else {
      const userInput = e.target.value;
      const url = `http://robohash.org/${userInput}`;
      setUserAvatarPic(url);
    }
  };

  return (
    <MainWrapper>
      {redirect && <Redirect push to="/login" />}
      <LogoImage src={userAvatarPic} userAvatarPic={userAvatarPic} />
      {wrongUser && <WrongUserPopUp wrongUser={wrongUser}>{popUpMessage}</WrongUserPopUp>}
      <SignUpForm onSubmit={signUpForm}>
        <EmailInput type="email" name="Email" placeholder="Email" />
        <NameInput
          type="text"
          name="username"
          placeholder="Username"
          onChange={e => {
            changeAvatarPic(e);
          }}
        />
        <PasswordInput type="password" name="password" placeholder="Password" onKeyUp={e => passwordCheck(e)} />
        <ConfirmPasswordInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          passwordsMatch={passwordsMatch}
          onKeyUp={e => passwordConfirmationCheck(e)}
        />
        <SignUpButton type="submit" value="Sign Up" passwordsMatch={passwordsMatch}>
          Sign Up
        </SignUpButton>
      </SignUpForm>
    </MainWrapper>
  );
};

export default SignUp;

const MainWrapper = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start" })};
  height: 100vh;
  background-image: linear-gradient(to top right, purple, deeppink);
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const LogoImage = styled.img`
  height: 125px;
  width: 125px;
  margin: 70px 0 50px;
  background-color: ${({ userAvatarPic }) => (userAvatarPic === "InstagramLogo.png" ? "none" : "white")};
  border-radius: 15px;
`;

const SignUpForm = styled.form`
  background: white;
  ${flexbox({ dir: "column", jc: "space-between" })};
  /* height: 40%; */
  margin: 30px 0;
  width: 90%;
  padding: 60px 10px;
  border-radius: 4px;
  box-shadow: 2px 2px 10px gray;
  z-index: 2;
`;

const EmailInput = styled.input`
  width: 80%;
  height: 30px;
  border-bottom: 1px solid gray;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 10px;
  margin: 20px 0;
  &:focus {
    outline: none;
  }
`;

const NameInput = styled(EmailInput)``;
const PasswordInput = styled(EmailInput)``;

const ConfirmPasswordInput = styled(EmailInput)`
  color: ${({ passwordsMatch }) => (passwordsMatch ? "mediumblue" : "red")};
  opacity: ${({ passwordsMatch }) => (passwordsMatch ? "1" : "0.7")};
  border-bottom: ${({ passwordsMatch }) => (passwordsMatch ? "1px solid mediumblue" : "1px solid red")};
`;

const SignUpButton = styled.button`
  outline: none;
  border: none;
  ${flexbox()};
  height: 50px;
  width: 200px;
  box-shadow: 0px 2px 5px gray;
  text-shadow: 1px 1px 2px black;
  border-radius: 25px;
  font-size: 20px;
  color: whitesmoke;
  background-color: salmon;
  margin: 20px 0;
  background-image: linear-gradient(to top right, purple, deeppink);
  transition: 0.2s ease-out;

  opacity: ${({ passwordsMatch }) => (passwordsMatch ? "0.9" : "0.7")};
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const popUp = keyframes`
0% { transform: translateY(50px) }
20% { transform: translateY(0) }
100% { transform: translateY(0) }
`;

const WrongUserPopUp = styled.div`
z-index: 1;
${flexbox()}
color: black;
background: snow ;
text-align:center;
height: 50px;
padding: 5px;
width: 85%;
border-radius: 6px 6px 0 0;
position: absolute;
box-shadow: 2px 2px 10px purple;
line-height: 20px;
top: 201px;
animation: ${popUp} 1.5s linear 2 alternate;
  /* top: ${({ wrongUser }) => (wrongUser ? "-50px" : "0")}; */
`;
