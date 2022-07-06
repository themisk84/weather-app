import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  background-color: black;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`;

const HamburgerDiv = styled.div`
  width: 30px;
  height: 4px;
  background-color: var(--secondary);
  border-radius: 5px;
`;

const StyledHamburger = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1em;
  @media (min-width: 768px) {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  width: 50%;
`;

const H1 = styled.h1`
  color: var(--tertiary);
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  font-family: "The Nautigal", cursive;
  margin-left: 10px;
  color: var(--secondary);

  @media (min-width: 768px) {
    font-size: 26px;
  }

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const MobileNavMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b3b3b3;
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  height: 20vh;
`;

const StyledOption = styled.p`
  align-self: flex-end;
  color: var(--secondary);
  margin: 10px 20px;
  cursor: pointer;
`;

const StyledNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 40vw;
    font-size: 18px;
    padding-right: 40px;
  }

  @media (min-width: 992px) {
    width: 30vw;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--secondary);
  cursor: pointer;
`;

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const showMenu = () => {
    setVisible(!visible);
  };

  const clickToWeekly = () => {
    navigate("/weekly");
    setVisible(false);
  };

  const clickToHome = () => {
    navigate("/");
    setVisible(false);
  };

  const clickToBookmark = () => {
    navigate("/bookmark");
    setVisible(false);
  };

  const OutsideOfMenu = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setVisible(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  OutsideOfMenu(wrapperRef);

  return (
    <Div>
      <HeaderContainer>
        <H1>The Royal Palace weather forecast</H1>
      </HeaderContainer>

      <StyledHamburger onClick={showMenu}>
        <HamburgerDiv></HamburgerDiv>
        <HamburgerDiv></HamburgerDiv>
        <HamburgerDiv></HamburgerDiv>
      </StyledHamburger>

      {visible && (
        <MobileNavMenu ref={wrapperRef}>
          <StyledOption onClick={clickToHome}>Home</StyledOption>
          <StyledOption onClick={clickToWeekly}>Weekly Forecast</StyledOption>
          <StyledOption onClick={clickToBookmark}>Bookmarked</StyledOption>
        </MobileNavMenu>
      )}

      <StyledNav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/weekly">Weekly Forecast</StyledLink>
        <StyledLink to="/bookmark">Bookmarked</StyledLink>
      </StyledNav>
    </Div>
  );
};

export default NavBar;
