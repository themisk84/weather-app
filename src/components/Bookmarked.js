import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";

import { getWeatherCondition, getWind } from "../utils/functions";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`;

const ForecastDayContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  border: 1px solid black;
  padding: 5px;
  margin: 7.5px;
  background-color: var(--tertiary);
  cursor: pointer;

  @media (min-width: 768px) {
    width: 70%;
  }
`;

const ForecastDayInnerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  padding: 5px;
  margin: 5px;
  background-color: var(--tertiary);

  @media (min-width: 768px) {
    width: 70%;
  }
`;

const ElementSpan = styled.span`
  margin-right: 5px;
`;

const IconSpan = styled(ElementSpan)`
  font-size: 25px;
  padding-top: 7px;
`;

const StyledStar = styled(AiOutlineStar)`
  font-size: 20px;
  position: absolute;
  right: 5%;

  @media (min-width: 768px) {
    right: 18%;
  }
`;

const Bookmarked = () => {
  const initialBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("bookmark");
      if (storage) {
        setBookmarks(JSON.parse(storage));
      }
    }
  }, []);

  const changeBookmark = (key, item) => {
    if (bookmarks[key] !== undefined) {
      delete bookmarks[key];
    } else {
      bookmarks[key] = item;
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarks(bookmarks);
  };

  const toggleDay = (index) => {
    if (active === index) {
      setActive(-1);
    }
    setActive(index);
  };

  return (
    <OuterContainer>
      {Object.keys(bookmarks).length === 0 ? (
        <p>No forecast bookmarked</p>
      ) : (
        Object.keys(bookmarks).map((key, index) => {
          const item = bookmarks[key];

          const datefied = new Date(item.date).toDateString("en-us", {
            month: "short",
            day: "numeric",
          });
          return (
            <>
              <ForecastDayContainer onClick={() => toggleDay(index)}>
                {datefied}
                <StyledStar
                  onClick={() => changeBookmark(datefied, item)}
                  style={{
                    color:
                      bookmarks[datefied] !== undefined ? "#ff751a" : "black",
                  }}
                />
              </ForecastDayContainer>
              {active === index &&
                item.days.map((day) => {
                  return (
                    <ForecastDayInnerContainer>
                      <ElementSpan>
                        {new Date(day.time).getUTCHours()}
                      </ElementSpan>
                      {day.parameters.map((parameter) => {
                        if (parameter.name === "t") {
                          return (
                            <ElementSpan>
                              {Math.round(parameter.value[0])}&deg;C
                            </ElementSpan>
                          );
                        } else if (parameter.name === "Wsymb2") {
                          return (
                            <IconSpan>
                              {getWeatherCondition(parameter.value[0])}
                            </IconSpan>
                          );
                        } else if (parameter.name === "wd") {
                          return (
                            <IconSpan>{getWind(parameter.value[0])}</IconSpan>
                          );
                        } else if (parameter.name === "ws") {
                          return (
                            <ElementSpan>{parameter.value[0]} m/s</ElementSpan>
                          );
                        }
                      })}
                    </ForecastDayInnerContainer>
                  );
                })}
            </>
          );
        })
      )}
    </OuterContainer>
  );
};

export default Bookmarked;
