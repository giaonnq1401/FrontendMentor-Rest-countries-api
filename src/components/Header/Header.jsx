import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import styled from "styled-components";
import { useState } from "react";

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  padding: 0 80px;
  border-bottom: 1px solid var(--light-mode-input);
`;

const HeadingStyle = styled.h1`
  font-weight: 800;
`;

const Theme = styled.div `
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 11px;

  &:hover{
    cursor: pointer;
  }

  && span {
    font-weight: 600;
  }

`;


const Header = () => {
  return (
    <HeaderStyle>
      <HeadingStyle>Where in the world?</HeadingStyle>
      <Theme>
        <FontAwesomeIcon icon={ faMoon } />
        <span>Dark Mode</span>
      </Theme>
    </HeaderStyle>
  );
};

export default Header;