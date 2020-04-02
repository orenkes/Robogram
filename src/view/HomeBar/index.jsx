import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexbox } from "../../styles/mixins";
import { GlobalContext } from "../../state/GlobalContext";
import { FiLogOut, FiHome } from "react-icons/fi";
import { FaUserAstronaut, FaRegHandPeace } from "react-icons/fa";

const HomeBar = () => {
  const {
    loggedIn,
    loggedUser,
    setLoggedUser,
    dropDownIsOpen,
    setDropDownIsOpen
  } = useContext(GlobalContext);

  const logout = () => {
    setDropDownIsOpen(false);
    setLoggedUser({});
    window.location.href = "/credits";
  };

  return (
    <HomeBarSeparator>
      <HomeBarContainer loggedIn={loggedIn}>
        <StyledLinkFeed
          to="/feed"
          onClick={() => {
            setDropDownIsOpen(false);
            document.documentElement.scrollTop = 0;
          }}
          loggedIn={loggedIn}
        >
          <BackToFeedButton>
            <FiHome />
          </BackToFeedButton>
        </StyledLinkFeed>
        <StyledLinkLogo to="/feed">
          <Logo>
            Robogram
            <LogoImage src="bot-300x300.png" />
          </Logo>
        </StyledLinkLogo>
        <MenuBox loggedIn={loggedIn}>
          <AvatarDisplay
            src={loggedUser.avatar}
            onClick={() => setDropDownIsOpen(!dropDownIsOpen)}
          />
          <DropDown dropDownIsOpen={dropDownIsOpen}>
            <ProfileDisplay>{`Hi ${loggedUser.userName}!`}</ProfileDisplay>
            <StyledLink to="/profile" onClick={() => setDropDownIsOpen(false)}>
              <ProfileButton>
                <TextSpan>Your Profile</TextSpan> <FaUserAstronaut />
              </ProfileButton>
            </StyledLink>
            <StyledLink to="/credits" onClick={() => setDropDownIsOpen(false)}>
              <CreditsButton>
                <TextSpan>Credits</TextSpan> <FaRegHandPeace />
              </CreditsButton>
            </StyledLink>

            <LogOutButton
              onClick={() => {
                logout();
              }}
            >
              <TextSpan>Log Out </TextSpan>
              <FiLogOut />
            </LogOutButton>
          </DropDown>
        </MenuBox>
      </HomeBarContainer>
    </HomeBarSeparator>
  );
};

export default HomeBar;

const HomeBarSeparator = styled.div`
  ${flexbox()}
  width: 100vw;
  height: 50px;
  border-bottom: 1px solid lightslategrey;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 5;
`;

const HomeBarContainer = styled.div`
${flexbox()}
  justify-content: ${({ loggedIn }) =>
    loggedIn ? "space-between" : "space-around"};
  height: 100%;
  width: 100%;
  max-width: 450px;
  background-color: white;
  text-align: center;
`;

const StyledLinkFeed = styled(Link)`
  text-decoration: none;
  color: white;
  display: ${({ loggedIn }) => (loggedIn ? "block" : "none")};
`;

const BackToFeedButton = styled.div`
  flex-basis: 15%;
  color: black;
  font-size: 22px;

  border-radius: 50%;
  height: 35px;
  width: 35px;
  text-align: center;
  padding-top: 6px;

  opacity: 0.8;
  transition: 0.2s ease-out;

  &:hover {
    opacity: 1;
    box-shadow: 1px 1px 3px deeppink;
  }
`;

const Logo = styled.div`
  ${flexbox()};
  font-family: "Pacifico", cursive;
  font-size: 34px;
  flex-basis: 60%;

  :hover {
    filter: brightness(1.5);
  }
`;

const LogoImage = styled.img`
  height: 50px;
  width: 50px;
`;

const MenuBox = styled.div`
  display: ${({ loggedIn }) => (loggedIn ? "block" : "none")};
  position: relative;
`;

const AvatarDisplay = styled.img`
  flex-basis: 15%;
  height: 40px;
  border: 1px solid #313131;
  border-radius: 50%;
  margin-top: 6px;
  margin-right: 6px;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
`;

const DropDown = styled.ul`
  ${flexbox({ jc: "flex-between" })};
  flex-wrap: wrap;
  display: ${({ dropDownIsOpen }) => (dropDownIsOpen ? "block" : "none")};
  position: absolute;
  right: 2px;
  top: 50px;
  background: white;
  border: 2px solid #313131;
  box-shadow: 2px 5px 5px black;
  width: 250px;
  height: 200px;
  border-radius: 4px;
  z-index: 9;

  &:before {
    content: "";
    position: absolute;
    border-color: #313131 transparent;
    border-style: solid;
    border-width: 0px 6px 10px 6px;

    height: 0px;
    width: 0px;
    top: -10px;
    right: 10px;
  }
`;

const TextSpan = styled.div`
  flex-basis: 80%;
`;

const ProfileDisplay = styled.li`
  ${flexbox()}
  font-weight: bold;
  height: 25%;
  opacity: 0.6;
  flex-basis: 100%;
  background: #313131;
  color: white;
`;

const StyledLink = styled(Link)`
  ${flexbox()}
  color: black;
  text-decoration: none;
  text-align: left;
  height: 25%;
  flex-basis: 100%;
  opacity: 0.6;
  transition: 0.2s ease-out;
  color: #212121;

  &:hover {
    opacity: 0.9;
    background: #cee9ea;
    color: #121212;
  }
`;

const ProfileButton = styled.li`
  ${flexbox()}
  text-align: left;
  height: 25%;
  flex-basis: 100%;
`;

const CreditsButton = styled(ProfileButton)``;
const LogOutButton = styled(ProfileButton)`
  color: lightcoral;
  opacity: 0.9;
  transition: 0.2s ease-out;

  &:hover {
    opacity: 1;
    background: #defeff;
    color: crimson;
    cursor: pointer;
  }
`;

const StyledLinkLogo = styled(Link)`
  color: black;
  text-decoration: none;
`;
