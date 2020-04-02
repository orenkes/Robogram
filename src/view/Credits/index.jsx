import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexbox } from "../../styles/mixins";
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Techs from "./Techs";

const Credits = () => {
  const createMaker = ({ name, gitHub, linkdin, email, phone }) => {
    return (
      <Maker>
        {name}
        <LinksBox>
          <WebBox>
            <LinkHref href={gitHub} target="_blank">
              <GoMarkGithub />
            </LinkHref>

            <LinkHref href={linkdin} target="_blank">
              <FaLinkedin />
            </LinkHref>

            <LinkHref href={`mailto:${email}`}>
              <AiOutlineMail />
            </LinkHref>
          </WebBox>

          <WhatsappBox>
            <FaWhatsapp /> <NumberSpan>{phone}</NumberSpan>
          </WhatsappBox>
        </LinksBox>
      </Maker>
    );
  };

  const yarden = {
    name: "Yarden Shalom",
    gitHub: "",
    linkdin: "https://www.linkedin.com/in/yarden-shalom-a85a70197/",
    email: "yardeninho@gmail.com",
    phone: "054-9100290"
  };

  const oren = {
    name: "Oren Kesler",
    gitHub: "https://github.com/orenkes",
    linkdin: "https://www.linkedin.com/in/oren-kesler-934245144",
    email: "orenkes12@gmail.com",
    phone: "054-6308658"
  };

  return (
    <PageContainer>
      <InfoBox>
        <Greeting>Welcome To Robogram</Greeting>
        <OriginalPromise>This site was made from scratch by</OriginalPromise>
        <Logo />
        <MakersBox>
          {createMaker({ ...yarden })}
          {createMaker({ ...oren })}
        </MakersBox>
        <StyledLoginLink to="/login">Go To Site</StyledLoginLink>

        <Techs />

        <IntroductionGif />
        <SiteFeatures>
          <Header>This Site Features</Header>
          <Features>
            <Listing>Functional Users System</Listing>
            <Listing>
              Live Interface, Provide And Recive On The Spot Feedback From
              Others
            </Listing>
            <Listing>
              Share, Edit, And Manage Your Own Uploads And Comments At Your
              Personal Hub
            </Listing>
            <Listing>Like And Comment On Other Users's Uploads</Listing>
          </Features>
        </SiteFeatures>
      </InfoBox>
    </PageContainer>
  );
};

export default Credits;

const PageContainer = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start" })};
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(
    to right bottom,
    #06162c,
    #071425,
    #07121e,
    #080f17,
    #090c0f
  );
  color: snow;
  text-shadow: 1px 1px 1px black;
  font-family: "Muli", sans-serif;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

const InfoBox = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start" })};
  height: 100vh;
  margin-top: 50px;
  width: 90%;
`;

const Greeting = styled.div`
  font-size: 30px;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;

  @media (max-width: 430px) {
    font-size: 29px;
  }
`;

const Logo = styled.div`
  background-image: url("CompanyLogoClear.png");
  background-position: center;
  background-size: cover;
  height: 140px;
  min-height: 140px;

  width: 200px;
`;

const OriginalPromise = styled.div``;

const MakersBox = styled.div`
  ${flexbox({ jc: "space-around" })}
  width: 100%;
`;

const Maker = styled.div`
  flex-basis: 40%;
  text-align: center;
  height: 150px;
  font-size: 18px;
`;

const LinksBox = styled.div`
  ${flexbox()};
  flex-wrap: wrap;
`;

const WebBox = styled.div`
  ${flexbox({ jc: "space-between" })}
  flex-basis: 100%;
  margin: 20px 0 10px;
`;

const LinkHref = styled.a`
  flex-basis: 100%;
  font-size: 26px;
  opacity: 0.8;
  color: white;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const WhatsappBox = styled.div`
  ${flexbox({ jc: "flex-start" })}
  flex-basis: 100%;
  text-align: left;
  font-size: 28px;
  padding-left: 12px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 430px) {
    font-size: 16px;
  }
`;

const NumberSpan = styled.span`
  font-size: 16px;
  padding-left: 8px;

  @media (max-width: 430px) {
    font-size: 14px;
    padding-left: 6px;
  }
`;

const StyledLoginLink = styled(Link)`
  ${flexbox()}
  color: white;
  text-decoration: none;
  font-size: 36px;
  width: 250px;
  height: 80px;
  border: 3px solid white;
  box-shadow: 6px 6px slategray;
  padding: 15px 0;

  opacity: 0.9;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const IntroductionGif = styled.div``;

const SiteFeatures = styled.div``;

const Header = styled.h2`
  font-size: 22px;
  margin: 15px 5px;
`;

const Features = styled.ol`
  white-space: pre-wrap;
`;

const Listing = styled.li`
  ${flexbox({ jc: "flex-start" })}
  margin: 15px 15px;
  text-decoration: pointer;
  line-height: 22px;

  /* background: darkgray; */
  height: 55px;
  padding-left: 15px;
  border-left: 4px solid lightsteelblue;
  text-shadow: 1px 1px 2px black;
`;
