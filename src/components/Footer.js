import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 20vh;
  width: 100%;
  background-color: black;

  @media (min-width: 992px) {
    position: static;
  }
`;

const ContactParagraph = styled.div`
  margin-top: 10px;
  color: #ff751a;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <Container>
      <ContactParagraph>efthymios.karakasis@gmail.com</ContactParagraph>
      <ContactParagraph>tel: 0707427074</ContactParagraph>
    </Container>
  );
};

export default Footer;
