import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { WiThermometer, WiStrongWind } from "weather-icons-react";

import { LOCAL_HOST } from "../utils/urls";
import { getWeatherCondition, getWind } from "../utils/functions";

import { Context } from "./GlobalStore";
import Footer from "./Footer";

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 150px 20px;
  background-color: var(--tertiary);
  height: 150px;
  box-shadow: 5px 10px 2px black;

  @media (min-width: 768px) {
    margin: 100px 100px;
  }

  @media (min-width: 992px) {
    margin: 100px 150px;
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 25%;
  padding: 50px 5px 5px 5px;
`;

const DateHeader = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;

const ParameterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-left: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding-right: 2%;
  }
`;

const ParameterInnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WindDirectionHeader = styled.h4`
  font-size: 14px;
  font-weight: 300;
`;

const WeatherCondition = styled(ParameterInnerContainer)`
  font-size: 30px;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const ElementSpan = styled.span`
  margin-top: 12px;
  font-size: 30px;
`;

const ImageContainer = styled.div`
  display: none;
  width: 80%;

  @media (min-width: 768px) {
    display: block;
    width: 90%;
    margin: 0 auto;
  }

  @media (min-width: 992px) {
    width: 80%;
    margin-bottom: 20px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
`;
const CurrentWeather = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    fetch(LOCAL_HOST)
      .then((res) => res.json())
      .then((data) => {
        const forecastData = data;
        dispatch({ type: "SET_FORECAST", payload: forecastData });
      });
  }, [dispatch]);

  return (
    <>
      <DayContainer>
        <DateContainer>
          <DateHeader>Date</DateHeader>
          {new Date(state?.forecast[0]?.time).toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
          })}
        </DateContainer>
        <ParameterContainer>
          {state?.forecast[0]?.parameters.map((parameter) => {
            if (parameter.name === "t") {
              return (
                <ParameterInnerContainer>
                  <WiThermometer />
                  <div>{Math.round(parameter.value[0])}&deg;C</div>
                </ParameterInnerContainer>
              );
            } else if (parameter.name === "Wsymb2") {
              return (
                <WeatherCondition>
                  {getWeatherCondition(parameter.value[0])}
                </WeatherCondition>
              );
            } else if (parameter.name === "wd") {
              return (
                <ParameterInnerContainer>
                  <WindDirectionHeader>Wind Direction:</WindDirectionHeader>
                  <ElementSpan>{getWind(parameter.value[0])}</ElementSpan>
                </ParameterInnerContainer>
              );
            } else if (parameter.name === "ws") {
              return (
                <ParameterInnerContainer>
                  <WiStrongWind size={24} />
                  <div>{parameter.value[0]} m/s</div>
                </ParameterInnerContainer>
              );
            }
          })}
        </ParameterContainer>
      </DayContainer>
      <ImageContainer>
        <StyledImage
          src="/assets/royal_palace.jpeg"
          alt="royal palace of stockholm"
        />
      </ImageContainer>
      <Footer />
    </>
  );
};

export default CurrentWeather;
