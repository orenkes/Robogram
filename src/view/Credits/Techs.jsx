import React from "react";
import styled from "styled-components";
import { flexbox } from "../../styles/mixins";

import html5 from "./techLogos/HTML5.png";
import nodeJs from "./techLogos/NodeJs.png";
import react from "./techLogos/React.png";
import mongoDB from "./techLogos/mongoDB.png";
import mongoose from "./techLogos/mongoose1.png";
import styledcomponents from "./techLogos/styledComponents.png";
import expressJS from "./techLogos/expressJS.png";
import netlify from "./techLogos/netlify.png";
import javaScripts from "./techLogos/javaScripts.png";
import ziet from "./techLogos/ziet.png";

const Techs = () => {
  const logos = [html5, javaScripts, react, styledcomponents, nodeJs, expressJS, mongoose, mongoDB, ziet, netlify];

  const makeLogosBox = () => {
    const logosArray = logos.map(logo => <TechIcon icon={logo} />);
    return logosArray;
  };

  return (
    <TechsContainer>
      <TechsBox>{makeLogosBox()}</TechsBox>
    </TechsContainer>
  );
};

export default Techs;

const TechsContainer = styled.div`
  ${flexbox()};
  margin: 50px;
  width: 90%;
  height: 160px;
  background: white;
  border: 6px solid lightsteelblue;
  box-shadow: 6px 6px slategray;
`;

const TechsBox = styled.div`
  ${flexbox()};
  flex-wrap: wrap;
  width: 100%;
`;

const TechIcon = styled.div`
  background-image: url(${({ icon }) => icon});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 4px;
  flex-basis: 15%;
  height: 60px;
`;
