import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { flexbox } from "../../styles/mixins";
import { GlobalContext } from "../../state/GlobalContext";

const Login = () => {
  const { loggedUser, setLoggedUser, setLoggedIn } = useContext(GlobalContext);
  const [wrongUser, setWrongUser] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const sendForm = async e => {
    e.preventDefault();
    const inputUserName = e.target[0].value;
    const inputPasword = e.target[1].value;

    const fetchedData = await fetch(
      `https://instagram-database.youngwebdevs.now.sh/login/?userName=${inputUserName}&password=${inputPasword}`
    );
    const jsonData = await fetchedData.json();
    const foundUser = jsonData;

    if (foundUser.length === 1) {
      const passwordRemoved = {
        ...foundUser[0],
        password: "****"
      };

      setLoggedUser({ ...loggedUser, ...passwordRemoved });
      setLoggedIn(true);
      setRedirect(true);
    } else {
      setWrongUser(true);
      setTimeout(() => {
        setWrongUser(false);
      }, 3000);
    }
  };

  return (
    <MainWrapper>
      {redirect && <Redirect push to="/feed" />}
      <LogoImage src="InstagramLogo.png" />
      {wrongUser && (
        <WrongUserPopUp wrongUser={wrongUser}>
          Username or password are incorrect
        </WrongUserPopUp>
      )}
      <LogInForm onSubmit={sendForm}>
        <UsernameInput type="text" name="username" placeholder="Username" />
        <PasswordInput type="password" name="password" placeholder="Password" />
        <LogInButton type="submit" value="Log In">
          Log In
        </LogInButton>
        <SignUpLine>
          {`Not a member yet? `}
          <SignUpButton type="submit" value="Sign Up">
            <StyledLink to="/signup">
              <SignUpSpan>Sign Up</SignUpSpan>
            </StyledLink>
          </SignUpButton>
        </SignUpLine>
      </LogInForm>
    </MainWrapper>
  );
};

export default Login;

const MainWrapper = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start" })};
  height: 100vh;
  background-image: linear-gradient(to bottom left, purple, lightsalmon);
  position: relative;

  overflow-x: hidden;
`;

const LogoImage = styled.img`
  height: 100px;
  min-height: 100px;
  width: 100px;
  margin: 70px 0 50px;
`;

const LogInForm = styled.form`
  background: white;
  ${flexbox({ dir: "column", jc: "space-between" })};
  /* height: 40%; */
  margin: 30px 0;
  width: 90%;
  max-width: 450px;
  padding: 60px 10px;
  border-radius: 4px;
  box-shadow: 2px 2px 10px purple;
  z-index: 2;
`;

const UsernameInput = styled.input`
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

const PasswordInput = styled(UsernameInput)``;

const LogInButton = styled.button`
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
  background-image: linear-gradient(to top right, purple, lightsalmon);
  transition: 0.2s ease-out;

  opacity: 0.9;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const SignUpLine = styled.div``;

const SignUpButton = styled.button`
  background-color: white;
  border: none;
  outline: none;
  color: gray;
  font-size: 16px;
`;

const SignUpSpan = styled.span`
  background: linear-gradient(to right, purple, lightsalmon);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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
