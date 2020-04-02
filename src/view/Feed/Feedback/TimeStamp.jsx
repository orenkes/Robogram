import React, { useState } from "react";
import styled from "styled-components";

import { FiClock } from "react-icons/fi";
import { flexbox } from "../../../styles/mixins";

const TimeStamp = ({ timeStamp }) => {
  const [isClicked, setIsClicked] = useState(false);

  const HowManyDaysHavePassed = postTimeStamp => {
    const postDate = postTimeStamp;
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - postDate);
    const daysDifference = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (daysDifference === 0) {
      return `Posted today`;
    } else if (daysDifference <= 31) {
      return `${daysDifference} days ago`;
    } else {
      const convertedPostTime = new Date(Number(postTimeStamp));
      const dayMonthString = String(convertedPostTime).slice(4, 10);
      const yearString = String(convertedPostTime).slice(11, 15);
      const dateString = `${dayMonthString}, ${yearString}`;
      return dateString;
    }
  };

  return (
    <TimeStampBox>
      <TimeIcon onClick={() => setIsClicked(!isClicked)}>
        <FiClock />
      </TimeIcon>
      <CreatedAt isClicked={isClicked}>
        {HowManyDaysHavePassed(timeStamp)}
      </CreatedAt>
    </TimeStampBox>
  );
};

export default TimeStamp;

const TimeStampBox = styled.div`
  ${flexbox()};
`;

const TimeIcon = styled.div`
  flex-basis: 8%;
  &:hover {
    cursor: pointer;
    color: teal;
    transition: 0.3s ease-out;
  }
  transition: 0.3s ease-in;
`;

const CreatedAt = styled.div`
  opacity: ${({ isClicked }) => (isClicked ? "1" : "0")};
  transition: 0.5s ease-out;
  font-weight: bold;
  width: 100px;
  text-align: center;
  font-size: 14px;
  color: black;
  padding-bottom: 3px;
`;
